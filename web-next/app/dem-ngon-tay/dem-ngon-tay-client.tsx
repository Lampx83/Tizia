'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
// TTS dùng chung — chọn giọng theo chất lượng (Natural/Google trước), xem lib/tts.ts
import { speak, pickVoice } from '@/lib/tts';

// Shim giữ tương thích các effect warm-up cũ (lib tự nghe voiceschanged).
const pickVietnameseVoice = () => pickVoice('vi');

// Số ngón giơ = N ngón "👆" liền nhau cho N=1..5, còn N=6..10 = 🖐️ + (N-5) ngón "👆".
function renderHands(n: number): string {
  if (n <= 5) return Array.from({ length: n }, () => '👆').join('');
  return '🖐️' + Array.from({ length: n - 5 }, () => '👆').join('');
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Confetto = {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  round: boolean;
  dx: number;
  dy: number;
  rot: number;
};

const CONFETTI_COLORS = ['#fbbf24', '#ef4444', '#10b981', '#3b82f6', '#a855f7', '#ec4899'];

export default function DemNgonTayClient() {
  const [score, setScore] = useState(0);
  const [q, setQ] = useState(0);
  const [target, setTarget] = useState(1);
  const [choices, setChoices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; kind: 'ok' | 'bad' | '' }>({ text: '', kind: '' });
  const [locked, setLocked] = useState(false);
  const [markedCorrect, setMarkedCorrect] = useState<number | null>(null);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const [confettiGo, setConfettiGo] = useState(false);

  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiSeq = useRef(0);

  const nextQ = useCallback(() => {
    setQ((prev) => prev + 1);
    setFeedback({ text: '', kind: '' });
    setLocked(false);
    setMarkedCorrect(null);
    setWrongIdx(null);
    // Mầm non: dải 1..10
    const t = 1 + Math.floor(Math.random() * 10);
    // 5 đáp án: 1 đúng + 4 sai trong khoảng [1..10]
    const wrong = new Set<number>();
    while (wrong.size < 4) {
      const c = 1 + Math.floor(Math.random() * 10);
      if (c !== t) wrong.add(c);
    }
    setTarget(t);
    setChoices(shuffle([t, ...wrong]));
    speak('Cô đang giơ mấy ngón tay?');
  }, []);

  // Khởi tạo câu đầu tiên (tương đương nextQ() cuối script gốc).
  useEffect(() => {
    // Nạp voice list (Chrome nạp async).
    if (typeof speechSynthesis !== 'undefined') {
      try {
        speechSynthesis.addEventListener('voiceschanged', pickVietnameseVoice);
      } catch {
        /* noop */
      }
      pickVietnameseVoice();
    }
    nextQ();
    return () => {
      if (nextTimer.current) clearTimeout(nextTimer.current);
      if (wrongTimer.current) clearTimeout(wrongTimer.current);
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      if (typeof speechSynthesis !== 'undefined') {
        try {
          speechSynthesis.removeEventListener('voiceschanged', pickVietnameseVoice);
        } catch {
          /* noop */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fireConfetti = useCallback(() => {
    const batch: Confetto[] = [];
    const base = confettiSeq.current;
    for (let i = 0; i < 30; i++) {
      batch.push({
        id: base + i,
        left: 30 + Math.random() * 40,
        top: 25 + Math.random() * 30,
        size: 8 + Math.random() * 10,
        color: CONFETTI_COLORS[i % 6],
        round: Math.random() > 0.5,
        dx: (Math.random() - 0.5) * 480,
        dy: 200 + Math.random() * 300,
        rot: Math.random() * 720,
      });
    }
    confettiSeq.current = base + 30;
    // Bắt đầu ở vị trí gốc (chưa dịch chuyển) rồi tick sang trạng thái "go" ở
    // frame kế → transition mới chạy (tương đương requestAnimationFrame gốc).
    setConfettiGo(false);
    setConfetti(batch);
    requestAnimationFrame(() => requestAnimationFrame(() => setConfettiGo(true)));
    if (confettiTimer.current) clearTimeout(confettiTimer.current);
    confettiTimer.current = setTimeout(() => {
      setConfetti([]);
      setConfettiGo(false);
    }, 1300);
  }, []);

  const onChoose = (n: number, idx: number) => {
    if (locked) return;
    if (n === target) {
      setMarkedCorrect(idx);
      setLocked(true);
      setFeedback({ text: '🎉 Đúng rồi! Có ' + target + ' ngón tay!', kind: 'ok' });
      speak('Đúng rồi! Có ' + target + ' ngón tay!');
      setScore((s) => s + 10);
      fireConfetti();
      if (nextTimer.current) clearTimeout(nextTimer.current);
      nextTimer.current = setTimeout(nextQ, 1700);
    } else {
      setWrongIdx(idx);
      setFeedback({ text: '😅 Chưa đúng. Bé đếm lại nha!', kind: 'bad' });
      speak('Chưa đúng. Bé đếm lại nha!');
      if (wrongTimer.current) clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongIdx(null), 600);
    }
  };

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '16px 16px 32px', color: '#1f1147' }}>
      {/* Scoped CSS: trang gốc có bảng màu thương hiệu mầm non riêng (pastel + gradient),
          không dùng token theme tối của layout. Giữ nguyên như bản vanilla. */}
      <style>{dntCss}</style>

      <div className="dnt-top">
        <a className="dnt-back" href="javascript:history.back()">
          ← Quay lại
        </a>
        <h1>✋ Đếm Ngón Tay</h1>
        <div className="dnt-stats">
          <span className="dnt-b">⭐ {score}</span>
          <span className="dnt-b">🎯 Câu {q}</span>
        </div>
      </div>

      <div className="dnt-stage">
        <div className="dnt-ask">
          Cô đang giơ mấy ngón tay?{' '}
          <button
            type="button"
            className="dnt-tts"
            onClick={() => speak('Cô đang giơ mấy ngón tay?')}
            aria-label="Đọc câu hỏi"
          >
            🔊
          </button>
        </div>
        <div className="dnt-hands">{renderHands(target)}</div>
      </div>

      <div className="dnt-choices">
        {choices.map((c, i) => {
          const cls = ['dnt-ch', `dnt-c${i % 5}`];
          if (markedCorrect === i) cls.push('is-correct');
          if (wrongIdx === i) cls.push('is-wrong');
          return (
            <button
              key={`${q}-${i}`}
              type="button"
              className={cls.join(' ')}
              data-n={c}
              disabled={locked}
              onClick={() => onChoose(c, i)}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className={'dnt-feedback' + (feedback.kind ? ' ' + feedback.kind : '')}>{feedback.text}</div>

      {confetti.length > 0 && (
        <div className="dnt-confetti-layer">
          {confetti.map((p) => (
            <span
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left + '%',
                top: p.top + '%',
                width: p.size,
                height: p.size,
                background: p.color,
                borderRadius: p.round ? '50%' : '2px',
                transform: confettiGo
                  ? `translate(${p.dx}px, ${p.dy}px) rotate(${p.rot}deg)`
                  : 'translate(0,0) rotate(0)',
                opacity: confettiGo ? 0 : 1,
                transition: 'transform 1.1s cubic-bezier(.2,.6,.4,1), opacity 1.1s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// CSS gốc của trang (bảng màu mầm non), scoped bằng prefix .dnt-.
const dntCss = `
  .dnt-top { display:flex; align-items:center; gap:14px; padding: 10px 16px; background: rgba(255,255,255,.75);
    border-radius: 20px; backdrop-filter: blur(8px); margin-bottom: 14px; color:#1f1147; }
  .dnt-top h1 { margin:0; font-size: clamp(20px, 3vw, 28px); font-weight: 900; }
  .dnt-back { padding: 8px 16px; border-radius: 999px; background: #fff; text-decoration:none; color: #1f1147;
    font-weight: 800; border: 2px solid #34d399; }
  .dnt-stats { margin-left:auto; display:flex; gap: 10px; font-weight: 900; }
  .dnt-b { padding: 6px 14px; border-radius: 999px; background:#d1fae5; border:2px solid #34d399; color:#1f1147; }

  .dnt-stage { background: rgba(255,255,255,.85); border-radius: 28px; padding: 20px 16px;
    text-align:center; box-shadow: 0 10px 24px rgba(0,0,0,.08); margin-bottom: 14px; color:#1f1147; }
  .dnt-ask { font-size: clamp(20px, 2.6vw, 26px); font-weight: 800; color:#047857; }
  .dnt-hands { display:flex; gap: 14px; justify-content:center; flex-wrap:wrap; margin: 14px 0 6px; font-size: clamp(80px, 14vw, 140px); line-height:1; }
  .dnt-tts { width:54px; height:54px; border-radius:50%; border:none; cursor:pointer;
    background:#3b82f6; color:#fff; font-size:26px; vertical-align: middle;
    box-shadow:0 6px 14px rgba(59,130,246,.4); margin-left:10px; }
  .dnt-tts:active { transform: translateY(2px); }

  .dnt-choices { display:grid; gap: 14px; grid-template-columns: repeat(3, 1fr); max-width: 560px; margin: 0 auto; }
  @media (min-width: 720px) { .dnt-choices { grid-template-columns: repeat(5, 1fr); } }
  .dnt-ch { border:none; cursor:pointer; padding: 18px 8px; border-radius: 22px; font-family:inherit;
    font-size: clamp(40px, 6vw, 60px); font-weight: 900; color: #1f1147;
    border: 4px solid rgba(255,255,255,.55);
    box-shadow: 0 8px 0 rgba(0,0,0,.16), 0 14px 24px rgba(0,0,0,.18);
    transition: transform .12s, filter .18s; }
  .dnt-ch:disabled { cursor:default; }
  .dnt-c0 { background: linear-gradient(135deg,#fde68a,#fbbf24); }
  .dnt-c1 { background: linear-gradient(135deg,#fecaca,#f87171); }
  .dnt-c2 { background: linear-gradient(135deg,#bbf7d0,#34d399); }
  .dnt-c3 { background: linear-gradient(135deg,#bfdbfe,#60a5fa); }
  .dnt-c4 { background: linear-gradient(135deg,#e9d5ff,#c084fc); }
  .dnt-ch:hover:not(:disabled) { transform: translateY(-3px); }
  .dnt-ch:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 3px 0 rgba(0,0,0,.16); }
  .dnt-ch.is-correct { animation: dnt-pop .55s cubic-bezier(.2,.9,.3,1.6); border-color:#16a34a; }
  .dnt-ch.is-wrong { animation: dnt-wob .5s ease; filter:grayscale(.5) brightness(.85); }
  @keyframes dnt-pop { 40%{transform:scale(1.2)} 100%{transform:scale(1.05)} }
  @keyframes dnt-wob { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-12px)} 75%{transform:translateX(12px)} }

  .dnt-feedback { text-align:center; margin-top: 14px; font-size: 22px; font-weight: 900; min-height: 1.2em; }
  .dnt-feedback.ok { color: #16a34a; }
  .dnt-feedback.bad { color: #dc2626; }

  .dnt-confetti-layer { position:fixed; inset:0; pointer-events:none; z-index:9999; overflow:hidden; }
`;
