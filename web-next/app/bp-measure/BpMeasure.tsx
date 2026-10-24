'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

// Đo huyết áp (Korotkoff) — mô phỏng gauge canvas + bơm/xả.
// Port nguyên logic từ public/bp-measure.html. Không có content từ DB:
// mọi giá trị (trueSys/trueDia) sinh ngẫu nhiên; điểm gửi qua /api/attempts.

const MAXP = 300;
const A0 = Math.PI * 0.75;
const SW = Math.PI * 1.5;
function ang(p: number) {
  return A0 + (Math.min(Math.max(p, 0), MAXP) / MAXP) * SW;
}

type Phase = 'idle' | 'ready' | 'deflating' | 'done';
type State = {
  phase: Phase;
  p: number;
  trueSys: number;
  trueDia: number;
  mSys: number | null;
  mDia: number | null;
  sound: boolean;
  t: number;
};

function makeRound(): State {
  let sys = 100 + 2 * Math.floor(Math.random() * 31); // 100..160
  let dia = 60 + 2 * Math.floor(Math.random() * 16); // 60..90
  if (sys - dia < 35) dia = sys - 40;
  return { phase: 'idle', p: 0, trueSys: sys, trueDia: dia, mSys: null, mDia: null, sound: false, t: 0 };
}

function classify(s: number, d: number): [string, 'normal' | 'pre' | 'htn'] {
  if (s >= 140 || d >= 90) return ['Tăng huyết áp', 'htn'];
  if (s >= 120 || d >= 80) return ['Tiền tăng huyết áp', 'pre'];
  return ['Huyết áp bình thường', 'normal'];
}
function pts(err: number) {
  return err <= 3 ? 50 : err <= 6 ? 35 : err <= 10 ? 20 : 5;
}

// submitAttempt: POST /api/attempts (server lấy player từ session). Guest 401 → im lặng.
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

type Result = {
  mSys: number;
  mDia: number;
  trueSys: number;
  trueDia: number;
  sErr: number;
  dErr: number;
  gained: number;
  label: string;
  klass: 'normal' | 'pre' | 'htn';
  good: boolean;
};

export default function BpMeasure() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stRef = useRef<State>(makeRound());
  const scoreRef = useRef(0);

  const [, force] = useState(0);
  const rerender = useCallback(() => force((n) => n + 1), []);

  const [score, setScore] = useState(0);
  const [scoreShown, setScoreShown] = useState(false);
  const [sound, setSound] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [mSys, setMSys] = useState<number | null>(null);
  const [mDia, setMDia] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const syncFlags = useCallback(() => {
    const st = stRef.current;
    setPhase(st.phase);
    setSound(st.sound);
    setMSys(st.mSys);
    setMDia(st.mDia);
  }, []);

  const newRound = useCallback(() => {
    stRef.current = makeRound();
    setResult(null);
    syncFlags();
    rerender();
  }, [syncFlags, rerender]);

  const pump = useCallback(() => {
    const st = stRef.current;
    if (st.phase !== 'idle') return;
    st.p = 180;
    st.phase = 'ready';
    syncFlags();
  }, [syncFlags]);

  const deflate = useCallback(() => {
    const st = stRef.current;
    if (st.phase !== 'ready') return;
    st.phase = 'deflating';
    syncFlags();
  }, [syncFlags]);

  const markSys = useCallback(() => {
    const st = stRef.current;
    if (st.phase !== 'deflating' || st.mSys !== null) return;
    st.mSys = Math.round(st.p);
    syncFlags();
  }, [syncFlags]);

  const finish = useCallback(() => {
    const st = stRef.current;
    st.phase = 'done';
    const sErr = Math.abs((st.mSys as number) - st.trueSys);
    const dErr = Math.abs((st.mDia as number) - st.trueDia);
    const gained = pts(sErr) + pts(dErr);
    scoreRef.current += gained;
    const [label, klass] = classify(st.trueSys, st.trueDia);
    setScore(scoreRef.current);
    setScoreShown(true);
    setResult({
      mSys: st.mSys as number,
      mDia: st.mDia as number,
      trueSys: st.trueSys,
      trueDia: st.trueDia,
      sErr,
      dErr,
      gained,
      label,
      klass,
      good: sErr <= 8 && dErr <= 8,
    });
    syncFlags();
    submitAttempt({
      version: 'bp-measure',
      score: scoreRef.current,
      correct: (sErr <= 8 ? 1 : 0) + (dErr <= 8 ? 1 : 0),
      total: 2,
      durationMs: 0,
      details: { mSys: st.mSys, mDia: st.mDia, trueSys: st.trueSys, trueDia: st.trueDia },
    });
  }, [syncFlags]);

  const markDia = useCallback(() => {
    const st = stRef.current;
    if (st.phase !== 'deflating' || st.mSys === null || st.mDia !== null) return;
    st.mDia = Math.round(st.p);
    finish();
  }, [finish]);

  // Vòng lặp: xả hơi + phát hiện tiếng Korotkoff + vẽ gauge.
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let raf = 0;
    let last = performance.now();

    function draw() {
      const st = stRef.current;
      const cxp = 150,
        cyp = 150,
        R = 120;
      cx!.clearRect(0, 0, 300, 300);
      cx!.fillStyle = '#f8fafc';
      cx!.beginPath();
      cx!.arc(cxp, cyp, R + 10, 0, 7);
      cx!.fill();
      cx!.strokeStyle = '#475569';
      cx!.lineWidth = 3;
      cx!.beginPath();
      cx!.arc(cxp, cyp, R + 10, 0, 7);
      cx!.stroke();
      cx!.strokeStyle = '#1e293b';
      cx!.fillStyle = '#1e293b';
      cx!.lineWidth = 2;
      cx!.font = '11px Inter';
      cx!.textAlign = 'center';
      cx!.textBaseline = 'middle';
      for (let p = 0; p <= MAXP; p += 20) {
        const a = ang(p);
        const x1 = cxp + Math.cos(a) * (R - 2),
          y1 = cyp + Math.sin(a) * (R - 2);
        const long = p % 40 === 0;
        const x2 = cxp + Math.cos(a) * (R - (long ? 16 : 9)),
          y2 = cyp + Math.sin(a) * (R - (long ? 16 : 9));
        cx!.beginPath();
        cx!.moveTo(x1, y1);
        cx!.lineTo(x2, y2);
        cx!.stroke();
        if (long) {
          const lx = cxp + Math.cos(a) * (R - 30),
            ly = cyp + Math.sin(a) * (R - 30);
          cx!.fillText(String(p), lx, ly);
        }
      }
      const na = ang(st.p);
      cx!.strokeStyle = '#dc2626';
      cx!.lineWidth = 3;
      cx!.beginPath();
      cx!.moveTo(cxp, cyp);
      cx!.lineTo(cxp + Math.cos(na) * (R - 22), cyp + Math.sin(na) * (R - 22));
      cx!.stroke();
      cx!.fillStyle = '#334155';
      cx!.beginPath();
      cx!.arc(cxp, cyp, 9, 0, 7);
      cx!.fill();
      cx!.fillStyle = '#0f172a';
      cx!.font = 'bold 22px Inter';
      cx!.textAlign = 'center';
      cx!.fillText(Math.round(st.p) + ' mmHg', cxp, cyp + 58);
    }

    function tick(now: number) {
      const st = stRef.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (st.phase === 'deflating') {
        st.p -= 18 * dt; // ~18 mmHg/s
        const s = st.p <= st.trueSys && st.p >= st.trueDia;
        if (s !== st.sound) {
          st.sound = s;
          setSound(s);
        }
        if (st.p <= 25) {
          st.p = 0;
          if (st.mDia === null) {
            st.phase = 'ready';
            setPhase('ready');
          }
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const btnBase =
    'inline-block rounded-[11px] px-4 py-[11px] text-sm font-extrabold cursor-pointer m-[4px_4px_4px_0] transition disabled:opacity-40 disabled:cursor-not-allowed';
  const btnPrimary = `${btnBase} bg-[#fb7185] text-[#3b0a18] hover:brightness-110`;
  const btnGhost = `${btnBase} bg-transparent border border-white/25 text-white hover:brightness-110`;

  return (
    <div className="text-white">
      <div className="mb-4 flex items-center gap-3 text-sm">
        <Link href="/school?b=gpp&domain=pharmacy" className="opacity-80 hover:opacity-100">
          ← Nhà thuốc GPP
        </Link>
        <span className="font-bold">🩸 Đo huyết áp (Korotkoff)</span>
        <span className="flex-1" />
        {scoreShown && (
          <span>
            🎯 <span className="font-extrabold text-[#fb7185]">{score}</span>
          </span>
        )}
      </div>

      <div className="flex w-full flex-wrap items-start justify-center gap-[26px]">
        <div className="flex flex-[0_0_320px] flex-col items-center gap-3">
          <canvas ref={canvasRef} width={300} height={300} className="block" />
          <div
            className={
              'rounded-xl border px-4 py-2 text-[15px] font-bold ' +
              (sound
                ? 'border-[#fb7185] bg-[rgba(251,113,133,.22)] tz-bp-pulse'
                : 'border-white/10 bg-white/5')
            }
          >
            {sound ? '🔊 Nghe thấy tiếng đập (Korotkoff)' : '🔇 Im lặng'}
          </div>
        </div>

        <div className="min-w-[280px] max-w-[420px] flex-1">
          <div className="mb-[14px] rounded-[14px] border border-white/10 bg-white/5 px-[18px] py-4">
            <h3 className="mb-[10px] text-[15px] font-semibold">Quy trình đo</h3>
            <ol className="mt-1 list-decimal pl-[18px] text-[13px] leading-[1.7] opacity-85">
              <li>
                Bấm <b>Bơm</b> để bơm bao đo lên ~180 mmHg.
              </li>
              <li>
                Bấm <b>Xả từ từ</b> — kim tụt dần.
              </li>
              <li>
                Khi <b>nghe thấy tiếng đập đầu tiên</b> → bấm <b>Tâm thu</b>.
              </li>
              <li>
                Khi <b>tiếng biến mất</b> → bấm <b>Tâm trương</b>.
              </li>
            </ol>
            <div className="mt-3">
              <button className={btnPrimary} onClick={pump} disabled={phase !== 'idle'}>
                🫧 Bơm
              </button>
              <button className={btnPrimary} onClick={deflate} disabled={phase !== 'ready'}>
                🌬️ Xả từ từ
              </button>
            </div>
            <div>
              <button
                className={btnGhost}
                onClick={markSys}
                disabled={!(phase === 'deflating' && mSys === null)}
              >
                ▼ Tâm thu (Systolic)
              </button>
              <button
                className={btnGhost}
                onClick={markDia}
                disabled={!(phase === 'deflating' && mSys !== null && mDia === null)}
              >
                ▼ Tâm trương (Diastolic)
              </button>
            </div>
            <div>
              <button className={btnGhost} onClick={newRound}>
                ↺ Bệnh nhân mới
              </button>
            </div>
          </div>

          {result && (
            <div className="mb-[14px] rounded-[14px] border border-white/10 bg-white/5 px-[18px] py-4">
              <h3 className="mb-[10px] text-[15px] font-semibold">Kết quả</h3>
              <div className="text-[34px] font-extrabold text-[#fb7185]">
                {result.mSys}/{result.mDia} mmHg
              </div>
              <div className="flex justify-between border-b border-white/10 py-[5px] text-sm">
                <span>Bạn đo Tâm thu / Tâm trương</span>
                <b>
                  {result.mSys}/{result.mDia}
                </b>
              </div>
              <div className="flex justify-between border-b border-white/10 py-[5px] text-sm">
                <span>Giá trị thật</span>
                <b>
                  {result.trueSys}/{result.trueDia}
                </b>
              </div>
              <div className="flex justify-between border-b border-white/10 py-[5px] text-sm">
                <span>Sai số</span>
                <b>
                  ±{result.sErr} / ±{result.dErr} mmHg
                </b>
              </div>
              <div className="flex justify-between py-[5px] text-sm">
                <span>Điểm lần này</span>
                <b>+{result.gained} / 100</b>
              </div>
              <div
                className={
                  'mt-[10px] rounded-[10px] px-[13px] py-[9px] text-sm font-bold ' +
                  (result.klass === 'normal'
                    ? 'bg-[rgba(16,185,129,.18)]'
                    : result.klass === 'pre'
                      ? 'bg-[rgba(251,191,36,.18)]'
                      : 'bg-[rgba(239,68,68,.2)]')
                }
              >
                {(result.good ? '✓ Đo tốt! ' : '') + 'Phân loại: ' + result.label}
              </div>
              <div className="mt-[10px] text-xs leading-[1.5] opacity-60">
                Phân loại (Bộ Y tế): Bình thường &lt;120/80 · Tiền THA 120–139/80–89 · Tăng huyết áp
                ≥140/90 mmHg.
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes tzBpPulse { from { transform: scale(1); opacity: .8 } to { transform: scale(1.06); opacity: 1 } }
        .tz-bp-pulse { animation: tzBpPulse .5s infinite alternate; }
      `}</style>
    </div>
  );
}
