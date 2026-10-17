'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// TTS dùng chung — chọn giọng theo chất lượng (Natural/Google trước), xem lib/tts.ts
import { speak, pickVoice } from '@/lib/tts';

// Shim giữ tương thích các effect warm-up cũ (lib tự nghe voiceschanged).
const pickVietnameseVoice = () => pickVoice('vi');

// Bảng chữ cái Tiếng Việt: 29 chữ in hoa + số 0-9. Mầm non học nhận diện chữ in
// hoa trước. Đây là dữ liệu game tĩnh (bộ ký tự bảng chữ cái quốc gia), không phải
// content nghiệp vụ động — giữ nguyên như bản vanilla.
const POOL = [
  'A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ', 'P',
  'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

function pick(n: number, exclude: string[]): string[] {
  const set = new Set(exclude);
  const out: string[] = [];
  while (out.length < n) {
    const c = POOL[Math.floor(Math.random() * POOL.length)];
    if (!set.has(c)) {
      out.push(c);
      set.add(c);
    }
  }
  return out;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pronounce(ch: string): string {
  if (/^\d$/.test(ch)) return 'số ' + ch;
  return 'chữ ' + ch;
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

export default function GhepChuCaiClient() {
  const [score, setScore] = useState(0);
  const [q, setQ] = useState(0);
  const [target, setTarget] = useState('A');
  const [choices, setChoices] = useState<string[]>([]);
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
    const t = POOL[Math.floor(Math.random() * POOL.length)];
    const distractors = pick(3, [t]);
    setTarget(t);
    setChoices(shuffle([t, ...distractors]));
    speak('Đây là ' + pronounce(t) + '. Bé tap chữ giống nhé!');
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

  const onChoose = (c: string, idx: number) => {
    if (locked) return;
    if (c === target) {
      setMarkedCorrect(idx);
      setLocked(true);
      setFeedback({ text: '🎉 Đúng rồi! Đây là ' + pronounce(target) + '.', kind: 'ok' });
      speak('Đúng rồi! Đây là ' + pronounce(target));
      setScore((s) => s + 10);
      fireConfetti();
      if (nextTimer.current) clearTimeout(nextTimer.current);
      nextTimer.current = setTimeout(nextQ, 1700);
    } else {
      setWrongIdx(idx);
      setFeedback({ text: '😅 Chưa đúng. Bé thử lại nha!', kind: 'bad' });
      speak('Chưa đúng. Thử lại nha!');
      if (wrongTimer.current) clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongIdx(null), 600);
    }
  };

  return (
    // Trang gốc có bảng màu thương hiệu mầm non riêng (gradient pastel), không
    // dùng token theme tối của layout. Giữ nguyên bằng scoped CSS + wrapper.
    <div className="gcc-page">
      <style>{gccCss}</style>

      <div className="gcc-wrap">
        <div className="gcc-top">
          <a className="gcc-back" href="javascript:history.back()">
            ← Quay lại
          </a>
          <h1>🔤 Ghép Chữ Cái</h1>
          <div className="gcc-stats">
            <span className="gcc-b">⭐ {score}</span>
            <span className="gcc-b">🎯 Câu {q}</span>
          </div>
        </div>

        <div className="gcc-prompt">
          <div className="gcc-label">
            Tap vào chữ giống cô nha!{' '}
            <button
              type="button"
              className="gcc-tts"
              onClick={() => speak('Đây là ' + pronounce(target))}
              aria-label="Đọc chữ"
            >
              🔊
            </button>
          </div>
          <div className="gcc-glyph">{target}</div>
        </div>

        <div className="gcc-choices">
          {choices.map((c, i) => {
            const cls = ['gcc-ch', `gcc-c${i % 4}`];
            if (markedCorrect === i) cls.push('is-correct');
            if (wrongIdx === i) cls.push('is-wrong');
            return (
              <button
                key={`${q}-${i}`}
                type="button"
                className={cls.join(' ')}
                data-c={c}
                disabled={locked}
                onClick={() => onChoose(c, i)}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className={'gcc-feedback' + (feedback.kind ? ' ' + feedback.kind : '')}>{feedback.text}</div>
      </div>

      {confetti.length > 0 && (
        <div className="gcc-confetti-layer">
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

// CSS gốc của trang (bảng màu mầm non), scoped bằng prefix .gcc-.
const gccCss = `
  .gcc-page { background: linear-gradient(180deg, #fce7f3 0%, #ddd6fe 60%, #c7d2fe 100%);
    color:#1f1147; border-radius: 24px; min-height: 70vh; }
  .gcc-wrap { max-width: 980px; margin: 0 auto; padding: 16px 16px 32px; }

  .gcc-top { display:flex; align-items:center; gap:14px; padding: 10px 16px; background: rgba(255,255,255,.7);
    border-radius: 20px; backdrop-filter: blur(8px); margin-bottom: 14px; color:#1f1147; }
  .gcc-top h1 { margin:0; font-size: clamp(20px, 3vw, 28px); font-weight: 900; }
  .gcc-back { padding: 8px 16px; border-radius: 999px; background: #fff; text-decoration:none; color: #1f1147;
    font-weight: 800; border: 2px solid #c084fc; }
  .gcc-stats { margin-left:auto; display:flex; gap: 10px; font-weight: 900; }
  .gcc-b { padding: 6px 14px; border-radius: 999px; background:#f3e8ff; border:2px solid #c084fc; color:#1f1147; }

  .gcc-prompt { text-align:center; background: rgba(255,255,255,.85); padding: 22px 24px;
    border-radius: 28px; margin: 8px 0 14px; box-shadow: 0 10px 24px rgba(0,0,0,.08); color:#1f1147; }
  .gcc-label { font-size: clamp(20px, 2.6vw, 26px); font-weight: 800; color: #7c3aed; }
  .gcc-glyph { display: inline-block; font-size: clamp(120px, 18vw, 200px); font-weight: 900;
    line-height: 1; padding: 0 18px; color: #1f1147;
    background: linear-gradient(135deg,#fef3c7,#fbcfe8); border-radius: 24px;
    box-shadow: 0 8px 0 rgba(0,0,0,.15), 0 14px 30px rgba(0,0,0,.18); margin: 8px 0; }
  .gcc-tts { width:54px; height:54px; border-radius:50%; border:none; cursor:pointer;
    background:#3b82f6; color:#fff; font-size:26px; vertical-align: middle;
    box-shadow:0 6px 14px rgba(59,130,246,.4); }
  .gcc-tts:active { transform: translateY(2px); }

  .gcc-choices { display:grid; gap: 16px; grid-template-columns: repeat(2, 1fr); max-width: 720px; margin: 14px auto 0; }
  @media (min-width: 720px) { .gcc-choices { grid-template-columns: repeat(4, 1fr); } }
  .gcc-ch { border:none; cursor:pointer; padding: 22px 12px; border-radius: 24px; font-family:inherit;
    font-size: clamp(56px, 8vw, 84px); font-weight: 900; color: #1f1147;
    border: 4px solid rgba(255,255,255,.55);
    box-shadow: 0 10px 0 rgba(0,0,0,.16), 0 18px 30px rgba(0,0,0,.2);
    transition: transform .12s, filter .18s; }
  .gcc-ch:disabled { cursor:default; }
  .gcc-c0 { background: linear-gradient(135deg,#fde68a,#fbbf24); }
  .gcc-c1 { background: linear-gradient(135deg,#fecaca,#f87171); }
  .gcc-c2 { background: linear-gradient(135deg,#bbf7d0,#34d399); }
  .gcc-c3 { background: linear-gradient(135deg,#bfdbfe,#60a5fa); }
  .gcc-ch:hover:not(:disabled) { transform: translateY(-3px); }
  .gcc-ch:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 4px 0 rgba(0,0,0,.16); }
  .gcc-ch.is-correct { animation: gcc-pop .55s cubic-bezier(.2,.9,.3,1.6); border-color:#16a34a; }
  .gcc-ch.is-wrong { animation: gcc-wob .5s ease; filter:grayscale(.5) brightness(.85); }
  @keyframes gcc-pop { 40%{transform:scale(1.2)} 100%{transform:scale(1.05)} }
  @keyframes gcc-wob { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-12px)} 75%{transform:translateX(12px)} }

  .gcc-feedback { text-align:center; margin-top: 14px; font-size: 22px; font-weight: 900; min-height: 1.2em; }
  .gcc-feedback.ok { color: #16a34a; }
  .gcc-feedback.bad { color: #dc2626; }

  .gcc-confetti-layer { position:fixed; inset:0; pointer-events:none; z-index:9999; overflow:hidden; }
`;
