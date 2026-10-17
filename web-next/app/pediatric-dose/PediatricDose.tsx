'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Máy tính liều Nhi — port nguyên logic từ public/pediatric-dose.html.
// Client Component: cân nặng (slider) + chọn thuốc → tính liều/thể tích, vẽ ống
// tiêm lên <canvas>, kèm quiz tự kiểm. Điểm quiz gửi qua /api/attempts.
//
// LƯU Ý CONTENT: dữ liệu thuốc (DRUGS) mang tính minh hoạ giáo dục, được nhúng
// inline giống các lab anh em (bp-measure...). Chưa có API/DB cho catalog thuốc
// nhi — xem risks. Không có content nào fetch từ DB ở trang này.

type Drug = {
  name: string;
  mgkg: number;
  freq: number;
  maxDay: number;
  absMax: number;
  conc: number;
  concLabel: string;
};

const DRUGS: Record<string, Drug> = {
  paracetamol: { name: 'Paracetamol — hạ sốt/giảm đau', mgkg: 15, freq: 4, maxDay: 60, absMax: 1000, conc: 24, concLabel: '120 mg / 5 mL (24 mg/mL)' },
  ibuprofen: { name: 'Ibuprofen — hạ sốt/kháng viêm', mgkg: 10, freq: 3, maxDay: 40, absMax: 400, conc: 20, concLabel: '100 mg / 5 mL (20 mg/mL)' },
  amoxicillin: { name: 'Amoxicillin — kháng sinh', mgkg: 25, freq: 2, maxDay: 50, absMax: 500, conc: 50, concLabel: '250 mg / 5 mL (50 mg/mL)' },
};

function calc(weight: number, key: string) {
  const d = DRUGS[key];
  const raw = d.mgkg * weight;
  const capped = Math.min(raw, d.absMax);
  const vol = capped / d.conc;
  const day = capped * d.freq;
  const dayMax = d.maxDay * weight;
  return { d, raw, dose: capped, vol, day, dayMax, overCap: raw > d.absMax };
}

function fmt(n: number) {
  return Math.round(n * 10) / 10;
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

export default function PediatricDose() {
  const [weight, setWeight] = useState(12);
  const [drug, setDrug] = useState('paracetamol');
  const [score, setScore] = useState(0);
  const [scoreShown, setScoreShown] = useState(false);

  // quiz state
  const [quizAns, setQuizAns] = useState<number | null>(null);
  const [quizText, setQuizText] = useState(
    'Bấm "Câu hỏi mới" để luyện tính thể tích cần hút.',
  );
  const [quizInput, setQuizInput] = useState('');
  const [fb, setFb] = useState<{ ok: boolean; html: string } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const r = useMemo(() => calc(weight, drug), [weight, drug]);

  // === vẽ ống tiêm (tham chiếu 10 mL; nếu >10 mL, có cảnh báo riêng) ===
  const drawSyringe = useCallback((vol: number) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;
    const W = 220,
      H = 440;
    cx.clearRect(0, 0, W, H);
    const capMl = 10;
    const bx = 70,
      bw = 80,
      by = 40,
      bh = 320; // barrel
    // needle
    cx.strokeStyle = '#cbd5e1';
    cx.lineWidth = 3;
    cx.beginPath();
    cx.moveTo(110, by + bh);
    cx.lineTo(110, by + bh + 44);
    cx.stroke();
    // barrel outline
    cx.fillStyle = 'rgba(255,255,255,0.06)';
    cx.strokeStyle = '#94a3b8';
    cx.lineWidth = 2;
    cx.beginPath();
    cx.roundRect(bx, by, bw, bh, 8);
    cx.fill();
    cx.stroke();
    // liquid fill (from bottom)
    const frac = Math.max(0, Math.min(1, vol / capMl));
    const fh = bh * frac;
    cx.fillStyle = 'rgba(56,189,248,0.55)';
    cx.beginPath();
    cx.roundRect(bx + 3, by + bh - fh, bw - 6, fh, 6);
    cx.fill();
    // graduations
    cx.strokeStyle = 'rgba(255,255,255,0.45)';
    cx.fillStyle = 'rgba(255,255,255,0.7)';
    cx.lineWidth = 1;
    cx.font = '11px Inter';
    cx.textAlign = 'right';
    for (let m = 0; m <= capMl; m += 1) {
      const y = by + bh - (bh * m) / capMl;
      const long = m % 5 === 0;
      cx.beginPath();
      cx.moveTo(bx + bw, y);
      cx.lineTo(bx + bw - (long ? 14 : 8), y);
      cx.stroke();
      if (long) cx.fillText(m + 'mL', bx - 6, y + 4);
    }
    // plunger
    const py = by + bh - fh;
    cx.fillStyle = '#e2e8f0';
    cx.fillRect(bx - 2, py - 10, bw + 4, 10);
    cx.fillRect(bx + bw / 2 - 5, Math.max(by - 30, py - 70), 10, py - 10 - Math.max(by - 30, py - 70));
    cx.fillRect(bx + bw / 2 - 26, Math.max(by - 30, py - 70), 52, 10);
    // readout
    cx.fillStyle = '#38bdf8';
    cx.font = 'bold 20px Inter';
    cx.textAlign = 'center';
    cx.fillText(vol.toFixed(1) + ' mL', W / 2, H - 6);
  }, []);

  useEffect(() => {
    drawSyringe(r.vol);
  }, [r.vol, drawSyringe]);

  // cảnh báo (giống warn ở bản gốc)
  const warn = useMemo(() => {
    const msgs: string[] = [];
    let cls: 'cau' | 'bad' = 'cau';
    if (weight < 5) msgs.push('⚠️ Trẻ nhỏ/sơ sinh (<5 kg): liều cần bác sĩ chỉ định riêng.');
    if (r.overCap) {
      msgs.push('⛔ Đã chạm liều tối đa người lớn (' + r.d.absMax + ' mg) — không tăng thêm theo cân nặng.');
      cls = 'bad';
    }
    if (r.vol > 10) msgs.push('💡 Thể tích > 10 mL: chia nhiều lần hút hoặc chuyển dạng viên/gói cho trẻ lớn.');
    return { msgs, cls };
  }, [weight, r]);

  const newQ = useCallback(() => {
    const keys = Object.keys(DRUGS);
    const key = keys[Math.floor(Math.random() * keys.length)];
    const w = 4 + Math.floor(Math.random() * 22); // 4..25 kg
    const res = calc(w, key);
    setQuizAns(res.vol);
    setQuizText(
      `Bé ${w} kg, dùng ${DRUGS[key].name.split(' — ')[0]} (${DRUGS[key].concLabel
        .split('(')[0]
        .trim()}), liều ${DRUGS[key].mgkg} mg/kg/lần. Cần hút bao nhiêu mL mỗi lần?`,
    );
    setQuizInput('');
    setFb(null);
    setScoreShown(true);
  }, []);

  const checkQ = useCallback(() => {
    if (quizAns == null) return;
    const v = parseFloat(quizInput);
    if (isNaN(v)) {
      setFb({ ok: false, html: 'Nhập một số mL.' });
      return;
    }
    const ok = Math.abs(v - quizAns) <= Math.max(0.2, quizAns * 0.05);
    if (ok) {
      const next = score + 1;
      setScore(next);
      setFb({ ok: true, html: `✓ Chính xác! (${fmt(quizAns)} mL)  +1` });
      submitAttempt({ version: 'pediatric-dose', score: next, correct: next, total: next, durationMs: 0, details: {} });
    } else {
      setFb({ ok: false, html: `✗ Chưa đúng. Đáp án: <b>${fmt(quizAns)} mL</b> (liều ÷ nồng độ).` });
    }
  }, [quizAns, quizInput, score]);

  return (
    <div className="text-white" style={{ ['--pd-accent' as string]: '#38bdf8' }}>
      {/* topbar */}
      <div className="mb-5 flex items-center gap-3 text-sm">
        <Link href="/school" className="text-white/80 hover:text-white">
          ← BV Thực hành
        </Link>
        <span className="font-bold">🧮 Máy tính liều Nhi</span>
        <span className="flex-1" />
        {scoreShown && (
          <span>
            🎯 <span className="font-extrabold text-[color:var(--pd-accent)]">{score}</span>
          </span>
        )}
      </div>

      <div className="flex w-full flex-wrap items-start gap-6">
        {/* left: canvas */}
        <div className="flex flex-[0_0_240px] flex-col items-center">
          <canvas ref={canvasRef} width={220} height={440} className="block" />
        </div>

        {/* right */}
        <div className="min-w-[280px] flex-1">
          {/* controls */}
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <label className="mb-1.5 flex justify-between text-[13px] opacity-85">
              Cân nặng của bé{' '}
              <b className="text-[color:var(--pd-accent)]">{weight} kg</b>
            </label>
            <input
              type="range"
              min={3}
              max={40}
              step={1}
              value={weight}
              onChange={(e) => setWeight(+e.target.value)}
              className="w-full"
              style={{ accentColor: 'var(--pd-accent)' }}
            />
            <label className="mb-1.5 mt-3.5 block text-[13px] opacity-85">Thuốc</label>
            <select
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
              className="w-full rounded-[10px] border border-white/20 bg-[#1e293b] px-3 py-2.5 text-sm text-white"
            >
              {Object.entries(DRUGS).map(([k, d]) => (
                <option key={k} value={k}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* result */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[13px] uppercase tracking-[0.6px] opacity-70">💉 Thể tích siro cần hút mỗi lần</div>
            <div className="my-[2px_0_4px] text-[42px] font-extrabold leading-[1.05] text-[color:var(--pd-accent)]">
              {fmt(r.vol)} mL
            </div>
            <div className="flex justify-between border-b border-white/10 py-1.5 text-sm">
              <span>Liều mỗi lần</span>
              <b>{Math.round(r.dose)} mg</b>
            </div>
            <div className="flex justify-between border-b border-white/10 py-1.5 text-sm">
              <span>Số lần / ngày</span>
              <b>
                {r.d.freq} lần (mỗi {Math.round(24 / r.d.freq)}h)
              </b>
            </div>
            <div className="flex justify-between border-b border-white/10 py-1.5 text-sm">
              <span>Tổng / ngày</span>
              <b>{Math.round(r.day)} mg/ngày</b>
            </div>
            <div className="flex justify-between border-b border-white/10 py-1.5 text-sm">
              <span>Giới hạn tối đa / ngày</span>
              <b>{Math.round(r.dayMax)} mg/ngày</b>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span>Nồng độ siro</span>
              <b>{r.d.concLabel}</b>
            </div>
            {warn.msgs.length > 0 && (
              <div
                className={
                  'mt-3 rounded-[10px] px-3 py-2.5 text-[13px] ' +
                  (warn.cls === 'bad'
                    ? 'border border-[rgba(239,68,68,.45)] bg-[rgba(239,68,68,.16)]'
                    : 'border border-[rgba(251,191,36,.4)] bg-[rgba(251,191,36,.14)]')
                }
                dangerouslySetInnerHTML={{ __html: warn.msgs.join('<br>') }}
              />
            )}
          </div>

          {/* quiz */}
          <div className="mt-[18px] rounded-2xl border border-[rgba(56,189,248,.3)] bg-[rgba(56,189,248,.08)] p-4">
            <h3 className="mb-2 text-[15px] font-bold">🎯 Tự kiểm tra (luyện tính nhanh)</h3>
            <div className="mb-2.5 text-sm">{quizText}</div>
            <div className="flex flex-wrap items-center gap-2">
              {quizAns != null && (
                <>
                  <input
                    type="number"
                    step={0.1}
                    placeholder="mL"
                    value={quizInput}
                    onChange={(e) => setQuizInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') checkQ();
                    }}
                    className="w-[110px] rounded-[9px] border border-white/20 bg-[#1e293b] px-[11px] py-2.5 text-[15px] text-white"
                  />
                  <button
                    onClick={checkQ}
                    className="cursor-pointer rounded-[10px] bg-[color:var(--pd-accent)] px-4 py-2.5 text-[13.5px] font-extrabold text-[#062a3d] hover:brightness-110"
                  >
                    Kiểm tra
                  </button>
                </>
              )}
              <button
                onClick={newQ}
                className="cursor-pointer rounded-[10px] border border-white/25 bg-transparent px-4 py-2.5 text-[13.5px] font-extrabold text-white hover:brightness-110"
              >
                🎲 Câu hỏi mới
              </button>
            </div>
            {fb && (
              <div
                className={'mt-2.5 text-[13.5px] ' + (fb.ok ? 'text-[#34d399]' : 'text-[#f87171]')}
                dangerouslySetInnerHTML={{ __html: fb.html }}
              />
            )}
          </div>

          <div className="mt-3.5 text-xs leading-[1.5] opacity-60">
            Công thức: <b>liều (mg) = mg/kg × cân nặng</b> (không vượt liều tối đa) · <b>thể tích (mL) = liều ÷ nồng độ
            siro</b>. Số liệu mang tính minh hoạ giáo dục — luôn theo chỉ định bác sĩ & tờ HDSD.
          </div>
        </div>
      </div>
    </div>
  );
}
