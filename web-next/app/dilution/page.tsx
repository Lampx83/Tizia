'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

// Máy tính pha loãng C₁V₁ = C₂V₂ + minh hoạ canvas + quiz tự kiểm.
// Trang tự chứa (không có content trong DB): quiz sinh ngẫu nhiên bằng công thức
// toán học phía client như trang gốc. Chỉ POST /api/attempts để lưu điểm.

type Result = { v1: number; solv: number; fold: number; valid: boolean };

function compute(c1: number, c2: number, v2: number): Result {
  const v1 = c1 > 0 ? (c2 * v2) / c1 : 0;
  return { v1, solv: v2 - v1, fold: c2 > 0 ? c1 / c2 : 0, valid: c2 > 0 && c2 < c1 && v2 > 0 && c1 > 0 };
}
function fmt(n: number): number {
  return Math.round(n * 100) / 100;
}

// Gửi kết quả tự kiểm về server (giống submitAttempt của /js/api.js). Guest → 401
// thì degrade âm thầm, không cắt ngang trải nghiệm.
async function submitAttempt(payload: { version: string; score: number; correct: number; total: number; durationMs: number; details: Record<string, unknown> }) {
  try {
    await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    });
  } catch {
    /* degrade âm thầm */
  }
}

export default function DilutionPage() {
  const [c1, setC1] = useState('100');
  const [c2, setC2] = useState('25');
  const [v2, setV2] = useState('200');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Quiz state
  const [qAns, setQAns] = useState<number | null>(null);
  const [qText, setQText] = useState('Bấm “Câu hỏi mới” để luyện tính V₁ cần lấy.');
  const [qShowInput, setQShowInput] = useState(false);
  const [qInput, setQInput] = useState('');
  const [score, setScore] = useState(0);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'ok' | 'no'; node: React.ReactNode } | null>(null);
  const qInputRef = useRef<HTMLInputElement | null>(null);

  const nc1 = +c1;
  const nc2 = +c2;
  const nv2 = +v2;
  const r = compute(nc1, nc2, nv2);

  const warn = !r.valid ? (nc2 >= nc1 ? '⚠️ C₂ phải NHỎ hơn C₁ mới pha loãng được.' : '⚠️ Nhập số dương hợp lệ.') : '';

  // Vẽ 2 bình chia độ + mũi tên → như trang gốc.
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const c = cv.getContext('2d');
    if (!c) return;
    c.clearRect(0, 0, 300, 340);

    function vessel(x: number, w: number, fillFrac: number, conc: number, cmax: number, label: string) {
      const ctx = c!;
      const y = 40,
        h = 240;
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 8);
      ctx.fill();
      ctx.stroke();
      const fh = h * Math.max(0, Math.min(1, fillFrac));
      const a = cmax > 0 ? Math.max(0.12, Math.min(0.95, conc / cmax)) : 0.2;
      ctx.fillStyle = `rgba(14,165,233,${a})`;
      ctx.beginPath();
      ctx.roundRect(x + 3, y + h - fh, w - 6, fh, 6);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const ty = y + h - (h * i) / 4;
        ctx.beginPath();
        ctx.moveTo(x + w, ty);
        ctx.lineTo(x + w - 8, ty);
        ctx.stroke();
      }
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + w / 2, y + h + 22);
    }

    const cmax = Math.max(nc1, nc2, 1);
    vessel(40, 90, r.valid ? r.v1 / nv2 : 0.6, nc1, cmax, `Gốc C₁=${nc1}`);
    c.fillStyle = '#94a3b8';
    c.font = '22px Inter';
    c.textAlign = 'center';
    c.fillText('→', 165, 165);
    vessel(180, 90, r.valid ? 1 : 0.6, nc2, cmax, `Pha C₂=${nc2}`);
    c.fillStyle = '#0ea5e9';
    c.font = 'bold 13px Inter';
    c.textAlign = 'center';
    if (r.valid) c.fillText(`Lấy ${fmt(r.v1)} mL + ${fmt(r.solv)} mL dung môi`, 150, 320);
  }, [nc1, nc2, nv2, r.valid, r.v1, r.solv]);

  const newQ = useCallback(() => {
    const c1s = [50, 100, 200, 250][Math.floor(Math.random() * 4)];
    const fold = [2, 4, 5, 10][Math.floor(Math.random() * 4)];
    const c2s = c1s / fold;
    const v2s = [100, 200, 250, 500][Math.floor(Math.random() * 4)];
    setQAns((c2s * v2s) / c1s);
    setQText(`Có dung dịch gốc ${c1s} mg/mL. Cần pha ${v2s} mL dung dịch ${c2s} mg/mL. Lấy bao nhiêu mL dung dịch gốc?`);
    setQShowInput(true);
    setQInput('');
    setFeedback(null);
    setScoreVisible(true);
    setTimeout(() => qInputRef.current?.focus(), 0);
  }, []);

  const checkQ = useCallback(() => {
    if (qAns == null) return;
    const v = parseFloat(qInput);
    if (isNaN(v)) {
      setFeedback({ kind: 'no', node: 'Nhập một số mL.' });
      return;
    }
    const ok = Math.abs(v - qAns) <= Math.max(0.5, qAns * 0.03);
    if (ok) {
      const next = score + 1;
      setScore(next);
      setFeedback({ kind: 'ok', node: `✓ Chính xác! (${fmt(qAns)} mL)  +1` });
      submitAttempt({ version: 'dilution', score: next, correct: next, total: next, durationMs: 0, details: {} });
    } else {
      setFeedback({
        kind: 'no',
        node: (
          <>
            ✗ Chưa đúng. V₁ = C₂·V₂÷C₁ = <b>{fmt(qAns)} mL</b>.
          </>
        ),
      });
    }
  }, [qAns, qInput, score]);

  return (
    <div className="text-foreground">
      {/* Thanh trên: quay lại PTN + tiêu đề + điểm */}
      <div className="mb-5 flex flex-wrap items-center gap-3 border-b border-border pb-3 text-sm">
        <Link href="/space?b=lab_qc&domain=pharmacy" className="text-muted-foreground hover:text-foreground">
          ← PTN Kiểm nghiệm
        </Link>
        <span className="font-bold">🧪 Pha loãng dung dịch (C₁V₁ = C₂V₂)</span>
        <span className="flex-1" />
        {scoreVisible && (
          <span>
            🎯 <span className="font-extrabold text-sky-400">{score}</span>
          </span>
        )}
      </div>

      {/* Full-width: 3 cột co giãn (canvas | máy tính | quiz) trải hết bề ngang,
          căn giữa phần dư trên màn siêu rộng. Canvas là raster tỷ lệ cố định 300×340
          → shrink-0 + flex-basis cố định, không kéo giãn méo hình. Các thẻ nhập liệu
          giữ max-width vừa đọc để nhãn/ô nhập không dàn quá xa nhau. */}
      <div className="flex w-full flex-wrap items-start justify-center gap-6">
        {/* Minh hoạ canvas — tỷ lệ cố định, không giãn */}
        <div className="flex shrink-0 flex-col items-center" style={{ flexBasis: 300 }}>
          <canvas ref={canvasRef} width={300} height={340} className="block" />
        </div>

        {/* Bảng điều khiển (máy tính pha loãng) */}
        <div className="min-w-[280px] max-w-[560px] flex-1">
          <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
            <div className="my-0.5 mb-3 text-center text-xl font-bold text-sky-400">C₁·V₁ = C₂·V₂</div>

            <div className="my-2 flex items-center justify-between gap-2.5 text-sm">
              <span>Nồng độ gốc C₁ (mg/mL)</span>
              <input type="number" min={1} step={1} value={c1} onChange={(e) => setC1(e.target.value)} className="w-[110px] rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white" />
            </div>
            <div className="my-2 flex items-center justify-between gap-2.5 text-sm">
              <span>Nồng độ cần pha C₂ (mg/mL)</span>
              <input type="number" min={0} step={1} value={c2} onChange={(e) => setC2(e.target.value)} className="w-[110px] rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white" />
            </div>
            <div className="my-2 flex items-center justify-between gap-2.5 text-sm">
              <span>Thể tích cần pha V₂ (mL)</span>
              <input type="number" min={1} step={1} value={v2} onChange={(e) => setV2(e.target.value)} className="w-[110px] rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white" />
            </div>

            <div className="rounded-xl border border-sky-500/35 bg-sky-500/10 p-3.5">
              <div className="text-3xl font-extrabold text-sky-400">
                {r.valid ? fmt(r.v1) : '–'} <small className="text-sm font-normal text-white/80">mL dung dịch gốc</small>
              </div>
              <div className="flex justify-between py-1 text-sm">
                <span>＋ Dung môi thêm vào</span>
                <b>{r.valid ? fmt(r.solv) + ' mL' : '–'}</b>
              </div>
              <div className="flex justify-between py-1 text-sm">
                <span>Hệ số pha loãng</span>
                <b>{r.fold ? '×' + fmt(r.fold) : '–'}</b>
              </div>
              <div className="mt-2 min-h-[18px] text-[13px] text-red-300">{warn}</div>
            </div>
          </div>
        </div>

        {/* Quiz tự kiểm + ghi chú (cột thứ 3, kề bên trên màn rộng) */}
        <div className="min-w-[280px] max-w-[560px] flex-1">
          {/* Quiz tự kiểm */}
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/[0.08] p-4">
            <div className="mb-2.5 text-sm leading-relaxed">{qText}</div>
            <div className="flex flex-wrap items-center gap-2">
              {qShowInput && (
                <input
                  ref={qInputRef}
                  type="number"
                  step={0.1}
                  placeholder="V₁ (mL)"
                  value={qInput}
                  onChange={(e) => setQInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') checkQ();
                  }}
                  className="w-[120px] rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white"
                />
              )}
              {qShowInput && (
                <button onClick={checkQ} className="cursor-pointer rounded-lg border-none bg-sky-500 px-4 py-2 text-[13.5px] font-extrabold text-[#042435]">
                  Kiểm tra
                </button>
              )}
              <button onClick={newQ} className="cursor-pointer rounded-lg border border-white/25 bg-transparent px-4 py-2 text-[13.5px] font-extrabold text-white">
                🎲 Câu hỏi mới
              </button>
            </div>
            {feedback && <div className={`mt-2.5 text-[13.5px] ${feedback.kind === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>{feedback.node}</div>}
          </div>

          <div className="mt-2.5 text-xs leading-relaxed opacity-60">
            Quy tắc: <b>V₁ = C₂·V₂ ÷ C₁</b> (lấy V₁ mL dung dịch gốc rồi thêm dung môi cho đủ V₂). Chỉ pha loãng được khi C₂ &lt; C₁.
          </div>
        </div>
      </div>
    </div>
  );
}
