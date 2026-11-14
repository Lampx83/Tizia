'use client';

// ============================================================
// Cấp phát thuốc · 5 Đúng — port từ public/dispense.html.
// Quiz 2 pha: (1) đếm đủ số viên theo đơn rồi "Cấp phát"; (2) đối chiếu nhãn
// đã in với đơn, quyết định Khớp/Có sai sót ("5 Đúng"). Lọ thuốc vẽ bằng
// <canvas> qua ref; vòng lặp vẽ lại mỗi khi số viên/đơn đổi.
//
// ĐƠN THUỐC LÀ NỘI DUNG SINH TỰ ĐỘNG (procedural): mỗi vòng bốc ngẫu nhiên 1
// đơn từ RX_POOL rồi tự sinh lỗi nhãn — KHÔNG phải content DB (không có ngân
// hàng câu hỏi cố định). Giữ nguyên trong code như trang gốc, y hệt cách các
// game sinh phép tính (bao-so-hoc) hay huyết áp (bp-measure) làm. Ghi rõ ở risks.
//
// Thao tác DOM của trang vanilla chuyển sang React state + refs. submitAttempt
// POST /api/attempts (server lấy player từ session; guest 401 → im lặng), y như
// bp-measure. Bảng màu/thẻ đơn-nhãn là bản sắc riêng của trang mô phỏng nhà
// thuốc → dùng CSS scoped (styled-jsx) với hex gốc, ghi rõ ở risks.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';

type Rx = { drug: string; strength: string; perDose: number; perDay: number; days: number };
type ErrField = 'drug' | 'perDose' | 'perDay' | 'days' | null;
type Label = { drug: string; strength: string; perDose: number; perDay: number; days: number; errField: ErrField };
type Phase = 'count' | 'label' | 'done';

const RX_POOL: Rx[] = [
  { drug: 'Amoxicillin', strength: '500 mg', perDose: 1, perDay: 3, days: 7 },
  { drug: 'Paracetamol', strength: '500 mg', perDose: 2, perDay: 3, days: 5 },
  { drug: 'Cetirizin', strength: '10 mg', perDose: 1, perDay: 1, days: 10 },
  { drug: 'Omeprazol', strength: '20 mg', perDose: 1, perDay: 2, days: 14 },
  { drug: 'Metformin', strength: '500 mg', perDose: 1, perDay: 2, days: 15 },
];

function fieldName(f: Exclude<ErrField, null>): string {
  return { drug: 'tên thuốc', perDose: 'liều/lần', perDay: 'số lần/ngày', days: 'số ngày' }[f];
}

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

function makeRound(): { rx: Rx; total: number; label: Label } {
  const rx = RX_POOL[Math.floor(Math.random() * RX_POOL.length)];
  const total = rx.perDose * rx.perDay * rx.days;
  // label: 55% correct, else inject one error
  const fields: Exclude<ErrField, null>[] = ['drug', 'perDose', 'perDay', 'days'];
  const label: Label = {
    drug: rx.drug,
    strength: rx.strength,
    perDose: rx.perDose,
    perDay: rx.perDay,
    days: rx.days,
    errField: null,
  };
  if (Math.random() < 0.45) {
    const f = fields[Math.floor(Math.random() * fields.length)];
    label.errField = f;
    if (f === 'drug') {
      label.drug = 'Ampicillin';
    } else {
      label[f] = label[f] + (Math.random() < 0.5 ? 1 : -1) * (f === 'days' ? 2 : 1) || label[f] + 1;
    }
    if (label.perDose < 1) label.perDose = 2;
    if (label.perDay < 1) label.perDay = 2;
    if (label.days < 1) label.days = 3;
  }
  return { rx, total, label };
}

export default function DispenseClient() {
  const [rx, setRx] = useState<Rx | null>(null);
  const [total, setTotal] = useState(0);
  const [label, setLabel] = useState<Label | null>(null);
  const [counted, setCounted] = useState(0);
  const [phase, setPhase] = useState<Phase>('count');
  const [firstTry, setFirstTry] = useState(true);
  const [score, setScore] = useState(0);
  const [scoreShown, setScoreShown] = useState(false);
  const [fb1, setFb1] = useState<{ text: string; ok: boolean } | null>(null);
  const [fb2, setFb2] = useState<{ text: string; ok: boolean } | null>(null);
  const [doneText, setDoneText] = useState('');

  const cvRef = useRef<HTMLCanvasElement | null>(null);

  const newRound = useCallback(() => {
    const r = makeRound();
    setRx(r.rx);
    setTotal(r.total);
    setLabel(r.label);
    setCounted(0);
    setPhase('count');
    setFirstTry(true);
    setFb1(null);
    setFb2(null);
    setDoneText('');
  }, []);

  useEffect(() => {
    newRound();
  }, [newRound]);

  // === bottle canvas ===
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const c = cv.getContext('2d');
    if (!c) return;
    c.clearRect(0, 0, 200, 300);
    const bx = 55,
      bw = 90,
      by = 70,
      bh = 200;
    // cap
    c.fillStyle = '#b45309';
    c.beginPath();
    c.roundRect(bx + 12, by - 26, bw - 24, 28, 5);
    c.fill();
    // bottle body
    c.fillStyle = 'rgba(255,255,255,0.08)';
    c.strokeStyle = '#cbd5e1';
    c.lineWidth = 2;
    c.beginPath();
    c.roundRect(bx, by, bw, bh, 12);
    c.fill();
    c.stroke();
    // pills
    const n = counted;
    const shown = Math.min(n, 60);
    c.fillStyle = '#fca5a5';
    for (let i = 0; i < shown; i++) {
      const col = i % 5,
        row = Math.floor(i / 5);
      const px = bx + 12 + col * 15 + (row % 2 ? 4 : 0);
      const py = by + bh - 16 - row * 13;
      if (py < by + 10) break;
      c.beginPath();
      c.ellipse(px, py, 6, 4, 0.3, 0, 7);
      c.fill();
    }
    if (n > shown) {
      c.fillStyle = '#fff';
      c.font = 'bold 13px Inter';
      c.textAlign = 'center';
      c.fillText('+' + (n - shown), bx + bw / 2, by + 18);
    }
    // label area on bottle
    c.fillStyle = 'rgba(255,255,255,0.85)';
    c.fillRect(bx + 8, by + bh - 46, bw - 16, 30);
    c.fillStyle = '#0c4a6e';
    c.font = '9px Inter';
    c.textAlign = 'center';
    c.fillText('Rx', bx + bw / 2, by + bh - 28);
  }, [counted]);

  const setCount = (n: number) => setCounted(Math.max(0, n));

  const dispense = () => {
    if (phase !== 'count' || !rx) return;
    if (counted === total) {
      if (firstTry) {
        setScore((s) => s + 50);
        setScoreShown(true);
      }
      setFb1({ ok: true, text: `✓ Đúng ${total} viên (${rx.perDose}×${rx.perDay}×${rx.days}).` });
      setPhase('label');
    } else {
      setFirstTry(false);
      setFb1({
        ok: false,
        text:
          counted > total
            ? `✗ Thừa ${counted - total} viên — tính lại: ${rx.perDose}×${rx.perDay}×${rx.days}.`
            : `✗ Thiếu ${total - counted} viên.`,
      });
    }
  };

  const decide = (flag: boolean) => {
    if (phase !== 'label' || !label) return;
    const hasErr = label.errField !== null;
    const correct = (flag && hasErr) || (!flag && !hasErr);
    if (correct) {
      setFb2({
        ok: true,
        text: hasErr
          ? `✓ Bắt đúng lỗi! Nhãn sai "${fieldName(label.errField as Exclude<ErrField, null>)}".`
          : '✓ Nhãn khớp đơn — giao thuốc an toàn.',
      });
    } else {
      setFb2({
        ok: false,
        text: hasErr
          ? `✗ Bỏ sót lỗi! Nhãn sai "${fieldName(label.errField as Exclude<ErrField, null>)}".`
          : '✗ Nhãn vốn đã đúng — không nên báo lỗi.',
      });
    }
    const newScore = score + (correct ? 50 : 0);
    setScore(newScore);
    setScoreShown(true);
    setPhase('done');
    setDoneText(
      `${correct ? '🎉 Cấp phát chuẩn!' : '⚠️ Cần cẩn thận hơn.'} Điểm: ${newScore}. Nhớ: tính đúng số lượng + kiểm 5 Đúng mỗi lần giao thuốc.`,
    );
    void submitAttempt({
      version: 'dispense',
      score: newScore,
      correct: correct ? 1 : 0,
      total: 1,
      durationMs: 0,
      details: { total, errField: label.errField },
    });
  };

  return (
    <div className="disp-root">
      <div className="topbar">
        <a href="/space?b=gpp&domain=pharmacy">← Nhà thuốc GPP</a>
        <span className="title">💊 Cấp phát thuốc · 5 Đúng</span>
        <span className="spacer" />
        {scoreShown && (
          <span>
            🎯 <span className="score">{score}</span>
          </span>
        )}
      </div>

      <div className="wrap">
        <div className="left">
          <canvas ref={cvRef} width={200} height={300} />
          <div className="count">
            {counted} <small>viên trong lọ</small>
          </div>
          <div>
            <button className="btn" onClick={() => setCount(counted + 1)}>
              +1
            </button>
            <button className="btn" onClick={() => setCount(counted + 5)}>
              +5
            </button>
            <button className="btn ghost" onClick={() => setCount(counted - 1)}>
              −1
            </button>
            <button className="btn ghost" onClick={() => setCount(0)}>
              Đổ hết
            </button>
          </div>
        </div>

        <div className="right">
          <div className="card">
            {rx && (
              <div className="rx">
                <h4>🧾 ĐƠN THUỐC</h4>
                {rx.drug} <b>{rx.strength}</b>
                <br />
                Uống <b>{rx.perDose}</b> viên/lần × <b>{rx.perDay}</b> lần/ngày × <b>{rx.days}</b> ngày
              </div>
            )}
          </div>

          {phase === 'count' && (
            <div className="card">
              <h4 style={{ margin: '0 0 8px' }}>Bước 1 — Đếm đủ số viên</h4>
              <div style={{ fontSize: '13.5px', opacity: 0.85 }}>
                Tính tổng số viên cần cấp từ đơn rồi bốc vào lọ, sau đó bấm “Cấp phát”.
              </div>
              <button className="btn" style={{ marginTop: 10 }} onClick={dispense}>
                ✅ Cấp phát
              </button>
              {fb1 && <div className={`fb ${fb1.ok ? 'ok' : 'no'}`}>{fb1.text}</div>}
            </div>
          )}

          {phase === 'label' && label && (
            <div className="card">
              <h4 style={{ margin: '0 0 8px' }}>Bước 2 — Kiểm “5 Đúng” trước khi giao</h4>
              <div className="label">
                <h4>🏷️ NHÃN ĐÃ IN</h4>
                <div className="f">
                  <span>Thuốc</span>
                  <b>
                    {label.drug} {label.strength}
                  </b>
                </div>
                <div className="f">
                  <span>Liều</span>
                  <b>{label.perDose} viên/lần</b>
                </div>
                <div className="f">
                  <span>Số lần/ngày</span>
                  <b>{label.perDay} lần</b>
                </div>
                <div className="f">
                  <span>Số ngày</span>
                  <b>{label.days} ngày</b>
                </div>
              </div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 8 }}>
                Đối chiếu NHÃN với ĐƠN. Nhãn có khớp không?
              </div>
              <button className="btn" onClick={() => decide(false)}>
                ✅ Khớp — Giao thuốc
              </button>
              <button className="btn danger" onClick={() => decide(true)}>
                🚩 Có sai sót!
              </button>
              {fb2 && <div className={`fb ${fb2.ok ? 'ok' : 'no'}`}>{fb2.text}</div>}
              <ul className="rights">
                <li>
                  Đúng <b>người bệnh</b> · Đúng <b>thuốc</b> · Đúng <b>hàm lượng/liều</b>
                </li>
                <li>
                  Đúng <b>số lần/ngày</b> · Đúng <b>số ngày & hướng dẫn</b>
                </li>
              </ul>
            </div>
          )}

          {phase === 'done' && (
            <div className="card">
              <h4 style={{ margin: '0 0 8px' }}>Hoàn thành ✓</h4>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{doneText}</div>
              <button className="btn" style={{ marginTop: 10 }} onClick={newRound}>
                ↺ Đơn mới
              </button>
            </div>
          )}

          <div className="note">
            Kỹ năng cấp phát GPP: tính đúng số lượng + kiểm “5 Đúng” để chặn sai sót thuốc (medication
            error). Số liệu minh hoạ.
          </div>
        </div>
      </div>

      {/* Bản sắc riêng của trang mô phỏng nhà thuốc — hex gốc từ dispense.html, scoped. */}
      <style jsx>{`
        .disp-root {
          --accent: #16a34a;
          color: #fff;
          margin: -1.5rem;
        }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          gap: 14px;
          align-items: center;
          padding: 10px 16px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 13px;
        }
        .topbar a {
          color: #fff;
          opacity: 0.8;
          text-decoration: none;
        }
        .topbar a:hover {
          opacity: 1;
        }
        .topbar .title {
          font-weight: 700;
        }
        .topbar .spacer {
          flex: 1;
        }
        .topbar .score {
          color: var(--accent);
          font-weight: 800;
        }
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 18px 18px 60px;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: center;
        }
        .left {
          flex: 0 0 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        canvas {
          display: block;
        }
        .right {
          flex: 1;
          min-width: 300px;
          max-width: 440px;
        }
        .card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 15px 17px;
          margin-bottom: 14px;
        }
        .rx {
          background: #fef9c3;
          color: #1f2937;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px;
          line-height: 1.7;
        }
        .rx :global(h4) {
          margin: 0 0 6px;
          color: #166534;
        }
        .rx :global(b) {
          color: #166534;
        }
        .label {
          background: #e0f2fe;
          color: #0c4a6e;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 13.5px;
          line-height: 1.7;
        }
        .label :global(h4) {
          margin: 0 0 6px;
        }
        .label :global(.f) {
          display: flex;
          justify-content: space-between;
        }
        .btn {
          background: var(--accent);
          color: #04240f;
          border: none;
          padding: 10px 15px;
          border-radius: 11px;
          font-family: inherit;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          margin: 4px 4px 0 0;
        }
        .btn.ghost {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #fff;
        }
        .btn.danger {
          background: #dc2626;
          color: #fff;
        }
        .btn:hover {
          filter: brightness(1.08);
        }
        .count {
          font-size: 40px;
          font-weight: 800;
          color: var(--accent);
          text-align: center;
        }
        .count :global(small) {
          font-size: 14px;
          opacity: 0.7;
          color: #fff;
          font-weight: 600;
        }
        .fb {
          margin-top: 10px;
          font-size: 14px;
          min-height: 20px;
        }
        .fb.ok {
          color: #34d399;
        }
        .fb.no {
          color: #f87171;
        }
        .rights {
          font-size: 13px;
          opacity: 0.9;
          line-height: 1.7;
          margin: 6px 0 0;
          padding-left: 18px;
        }
        .note {
          font-size: 12px;
          opacity: 0.6;
          margin-top: 8px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
