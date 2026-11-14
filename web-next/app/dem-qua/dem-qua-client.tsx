'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// TTS dùng chung — chọn giọng theo chất lượng (Natural/Google trước), xem lib/tts.ts
import { speak, pickVoice } from '@/lib/tts';

// Shim giữ tương thích các effect warm-up cũ (lib tự nghe voiceschanged).
const pickVietnameseVoice = () => pickVoice('vi');

type Apple = { id: number; x: number; y: number; picked: boolean; wrong: boolean };

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

// Sinh vị trí quả trải đều trên tán lá — random nhưng tránh chồng nhau quá.
function makeApples(n: number, startId: number): Apple[] {
  const positions: { x: number; y: number }[] = [];
  const out: Apple[] = [];
  for (let i = 0; i < n; i++) {
    let tries = 0;
    let x = 0;
    let y = 0;
    do {
      x = rand(18, 82);
      y = rand(20, 65);
      tries++;
    } while (tries < 20 && positions.some((p) => Math.hypot(p.x - x, p.y - y) < 14));
    positions.push({ x, y });
    out.push({ id: startId + i, x, y, picked: false, wrong: false });
  }
  return out;
}

export default function DemQuaClient() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState(3);
  const [picked, setPicked] = useState(0);
  const [started, setStarted] = useState(false);
  const [promptHtml, setPromptHtml] = useState<string | null>(null); // null = câu chào ban đầu
  const [apples, setApples] = useState<Apple[]>(() => makeApples(5, 0));
  const [toast, setToast] = useState<{ msg: string; bad: boolean; show: boolean }>({
    msg: '',
    bad: false,
    show: false,
  });
  const [confetti, setConfetti] = useState<
    { id: number; left: number; top: number; size: number; color: string; round: boolean; dx: number; dy: number; rot: number; go: boolean }[]
  >([]);

  const idSeq = useRef(1000);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nạp danh sách giọng nói (Chrome nạp async).
  useEffect(() => {
    if (typeof speechSynthesis === 'undefined') return;
    const onVoices = () => pickVietnameseVoice();
    try {
      speechSynthesis.addEventListener('voiceschanged', onVoices);
    } catch {
      /* noop */
    }
    pickVietnameseVoice();
    return () => {
      try {
        speechSynthesis.removeEventListener('voiceschanged', onVoices);
      } catch {
        /* noop */
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (nextTimer.current) clearTimeout(nextTimer.current);
    };
  }, []);

  const showToast = useCallback((msg: string, bad = false) => {
    setToast({ msg, bad, show: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 1800);
  }, []);

  const fireConfetti = useCallback(() => {
    const colors = ['#fbbf24', '#ef4444', '#10b981', '#3b82f6', '#a855f7', '#ec4899'];
    const pieces = Array.from({ length: 36 }, (_, i) => ({
      id: idSeq.current + i,
      left: 30 + Math.random() * 40,
      top: 30 + Math.random() * 30,
      size: 8 + Math.random() * 10,
      color: colors[i % 6],
      round: Math.random() > 0.5,
      dx: (Math.random() - 0.5) * 500,
      dy: 200 + Math.random() * 320,
      rot: Math.random() * 720,
      go: false,
    }));
    idSeq.current += 40;
    setConfetti(pieces);
    requestAnimationFrame(() => setConfetti((ps) => ps.map((p) => ({ ...p, go: true }))));
    setTimeout(() => setConfetti([]), 1400);
  }, []);

  const nextRound = useCallback(() => {
    // Random target từ 1..7 (mầm non — không quá 10), số quả trên cây >= target + 2.
    const t = 1 + Math.floor(Math.random() * 7);
    const onTree = t + 2 + Math.floor(Math.random() * 4); // 3..12 quả
    const startId = idSeq.current;
    idSeq.current += onTree;
    setRound((r) => r + 1);
    setTarget(t);
    setPicked(0);
    setApples(makeApples(onTree, startId));
    setPromptHtml(`Hái cho cô <b>${t}</b> quả 🍎 nào!`);
    speak(`Hái cho cô ${t} quả táo nào!`);
  }, []);

  const onPick = useCallback(
    (id: number) => {
      setApples((prev) => {
        const a = prev.find((x) => x.id === id);
        if (!a || a.picked) return prev;
        if (picked >= target) {
          // Quá tay — báo nhẹ, lắc quả rồi trả lại.
          speak('Đủ rồi nha! Bé đã hái đủ.');
          showToast('😅 Đủ rồi nha!', true);
          setTimeout(() => {
            setApples((ps) => ps.map((x) => (x.id === id ? { ...x, wrong: false } : x)));
          }, 600);
          return prev.map((x) => (x.id === id ? { ...x, wrong: true } : x));
        }
        const nextPicked = picked + 1;
        setPicked(nextPicked);
        speak(String(nextPicked), { rate: 1.05 });
        if (nextPicked === target) {
          setScore((s) => s + 10);
          fireConfetti();
          showToast('🎉 Hái đúng ' + target + ' quả!');
          speak('Đúng rồi! Bé hái đúng ' + target + ' quả!');
          if (nextTimer.current) clearTimeout(nextTimer.current);
          nextTimer.current = setTimeout(nextRound, 1600);
        }
        return prev.map((x) => (x.id === id ? { ...x, picked: true } : x));
      });
    },
    [picked, target, showToast, fireConfetti, nextRound],
  );

  const onStart = useCallback(() => {
    setStarted(true);
    nextRound();
  }, [nextRound]);

  const onReset = useCallback(() => {
    setPicked(0);
    setApples((prev) => makeApples(prev.length || target + 3, idSeq.current));
    idSeq.current += (apples.length || target + 3) + 1;
  }, [target, apples.length]);

  const promptTts = useCallback(() => {
    if (promptHtml == null) {
      speak('Cùng hái quả táo nào!');
    } else {
      speak(`Hái cho cô ${target} quả táo nào!`);
    }
  }, [promptHtml, target]);

  return (
    <div className="dq-root">
      <style>{CSS}</style>

      <div className="wrap">
        <div className="top">
          <a className="back" href="/school">← Quay lại</a>
          <h1>🍎 Đếm Quả Trên Cây</h1>
          <div className="stats">
            <span className="b">⭐ {score}</span>
            <span className="b">🎯 Vòng {round}</span>
          </div>
        </div>

        <div className="prompt">
          {promptHtml == null ? (
            'Cô đã hái sẵn quả 🍎 chưa? Cùng đếm nhé!'
          ) : (
            <span dangerouslySetInnerHTML={{ __html: promptHtml }} />
          )}
          <button className="tts" title="Nghe lại" aria-label="Đọc to" onClick={promptTts}>
            🔊
          </button>
        </div>

        <div className="tree" aria-label="Cây táo có nhiều quả">
          {apples.map((a) => (
            <button
              key={a.id}
              className={'apple' + (a.picked ? ' picked' : '') + (a.wrong ? ' wrong' : '')}
              style={{ left: a.x + '%', top: a.y + '%' }}
              aria-label="Quả táo"
              onClick={() => onPick(a.id)}
            >
              🍎
            </button>
          ))}
        </div>
        <div className="ground" />

        <div className="basket">
          🧺 Đã hái: <span className="count">{picked}</span> / <span>{target}</span> quả
        </div>

        <div className="actions">
          <button className="btn primary" onClick={started ? nextRound : onStart}>
            {started ? '▶ Vòng kế' : '▶ Bắt đầu'}
          </button>
          <button className="btn ghost" onClick={onReset}>
            🔁 Hái lại
          </button>
        </div>
      </div>

      <div className={'toast' + (toast.bad ? ' bad' : '') + (toast.show ? ' show' : '')}>{toast.msg}</div>

      {confetti.length > 0 && (
        <div className="confetti">
          {confetti.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left + '%',
                top: p.top + '%',
                width: p.size + 'px',
                height: p.size + 'px',
                background: p.color,
                borderRadius: p.round ? '50%' : '2px',
                transform: p.go ? `translate(${p.dx}px,${p.dy}px) rotate(${p.rot}deg)` : 'translate(0,0) rotate(0)',
                opacity: p.go ? 0 : 1,
                transition: 'transform 1.2s cubic-bezier(.2,.6,.4,1), opacity 1.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Trang mầm non có thương hiệu màu riêng (nền trời/cỏ vàng, quả to) — GIỮ NGUYÊN
// palette + hiệu ứng gốc bằng scoped CSS thay vì token theme tối. Xem risks.
const CSS = `
.dq-root { --bg-1:#fef3c7; --bg-2:#fde68a; --sky:#bae6fd; --ink:#1f1147;
  min-height: calc(100vh - 4rem); margin: -1rem -1rem 0; padding: 0;
  color: var(--ink); font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif;
  background: linear-gradient(180deg, var(--sky) 0%, var(--bg-1) 60%, var(--bg-2) 100%); }
.dq-root * { box-sizing:border-box; }
.dq-root .wrap { max-width: 980px; margin: 0 auto; padding: 16px 16px 32px; }
.dq-root .top { display:flex; align-items:center; gap:14px; padding: 10px 16px; background: rgba(255,255,255,.65);
  border-radius: 20px; backdrop-filter: blur(8px); margin-bottom: 14px; }
.dq-root .top h1 { margin:0; font-size: clamp(20px, 3vw, 28px); font-weight: 900; }
.dq-root .top .back { padding: 8px 16px; border-radius: 999px; background: #fff; text-decoration:none; color: var(--ink);
  font-weight: 800; border: 2px solid #fbbf24; }
.dq-root .stats { margin-left:auto; display:flex; gap: 10px; font-weight: 900; }
.dq-root .stats .b { padding: 6px 14px; border-radius: 999px; background:#fef3c7; border:2px solid #fbbf24; }

.dq-root .prompt { text-align:center; font-size: clamp(28px, 4.2vw, 42px); font-weight: 900; color: #b45309;
  background: rgba(255,255,255,.75); padding: 18px 24px; border-radius: 28px; margin: 8px 0 14px;
  box-shadow: 0 10px 24px rgba(0,0,0,.08); }
.dq-root .tts { width:54px; height:54px; border-radius:50%; border:none; cursor:pointer;
  background:#3b82f6; color:#fff; font-size:26px; margin-left: 10px; vertical-align: middle;
  box-shadow:0 6px 14px rgba(59,130,246,.4); }
.dq-root .tts:active { transform: translateY(2px); }

.dq-root .tree {
  position: relative; margin: 0 auto; width: min(92vw, 720px); aspect-ratio: 1 / 0.85;
  background:
    radial-gradient(ellipse 60% 50% at 50% 38%, #86efac 0%, #4ade80 80%, transparent 82%),
    radial-gradient(ellipse 25% 60% at 50% 78%, #92400e 0%, #78350f 80%, transparent 82%);
  border-radius: 24px; }
.dq-root .ground { width: 100%; height: 60px; margin-top: -30px; background: linear-gradient(180deg, #4ade80, #16a34a);
  border-radius: 0 0 32px 32px; box-shadow: inset 0 -6px 0 #15803d; }

.dq-root .apple { position:absolute; transform: translate(-50%, -50%);
  width: clamp(56px, 9vw, 84px); height: clamp(56px, 9vw, 84px);
  border-radius: 50%; border: none; cursor: pointer; font-size: clamp(36px, 6vw, 52px);
  background: transparent; padding: 0; user-select:none;
  transition: transform .12s, filter .18s; line-height: 1; }
.dq-root .apple:hover { transform: translate(-50%, -50%) scale(1.12); filter: drop-shadow(0 4px 8px rgba(0,0,0,.3)); }
.dq-root .apple:active { transform: translate(-50%, -50%) scale(.92); }
.dq-root .apple.picked { animation: dqFall 1s ease-in forwards; pointer-events:none; }
@keyframes dqFall {
  0% { transform: translate(-50%, -50%) rotate(0); opacity:1; }
  100% { transform: translate(-50%, 220%) rotate(140deg); opacity: 0; } }
.dq-root .apple.wrong { animation: dqWob .5s ease; }
@keyframes dqWob { 0%,100%{transform:translate(-50%,-50%) rotate(0)} 25%{transform:translate(calc(-50% - 10px),-50%) rotate(-8deg)} 75%{transform:translate(calc(-50% + 10px),-50%) rotate(8deg)} }

.dq-root .basket { text-align:center; font-size: clamp(24px, 3.4vw, 32px); margin-top: 16px;
  background: rgba(255,255,255,.8); border-radius: 20px; padding: 12px 22px;
  font-weight: 900; color: #b45309; }
.dq-root .basket .count { color: #16a34a; font-size: 1.4em; }

.dq-root .actions { display:flex; gap:14px; justify-content:center; margin-top: 14px; flex-wrap:wrap; }
.dq-root .btn { padding: 14px 28px; border:none; border-radius: 999px; cursor:pointer;
  font-family: inherit; font-size: 18px; font-weight: 900; color: var(--ink);
  box-shadow: 0 6px 0 rgba(0,0,0,.15); }
.dq-root .btn.primary { background: linear-gradient(90deg,#fbbf24,#f59e0b); }
.dq-root .btn.ghost { background: rgba(255,255,255,.85); border: 2px solid #fbbf24; }
.dq-root .btn:active { transform: translateY(3px); box-shadow: 0 3px 0 rgba(0,0,0,.15); }

.dq-root .toast { position: fixed; left:50%; bottom: 32px; transform: translateX(-50%);
  background: #16a34a; color:#fff; padding: 14px 28px; border-radius: 999px;
  font-weight: 900; font-size: 20px; opacity:0; transition: opacity .25s;
  box-shadow: 0 10px 24px rgba(0,0,0,.25); pointer-events: none; z-index: 50; }
.dq-root .toast.show { opacity: 1; }
.dq-root .toast.bad { background: #dc2626; }

.dq-root .confetti { position:fixed; inset:0; pointer-events:none; z-index:9999; overflow:hidden; }
`;
