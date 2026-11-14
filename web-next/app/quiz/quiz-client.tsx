'use client';

// ============================================================
// Quiz nhanh — port từ public/quiz.html.
// Nhìn tên thuốc → chọn đúng nhóm điều trị · 10 câu/lượt · 15s/câu.
//
// CONTENT (catalog thuốc + danh sách nhóm điều trị) KHÔNG ở đây: nó sống trong
// /js/engine/drug-db.js (module gốc). Trang này IMPORT ĐỘNG các module legacy
// lúc runtime qua path đã proxy (`/js/...`), KHÔNG nhân bản content sang code
// Next. `shuffle` lấy từ /js/medicines.js, submit/tên người chơi từ /js/api.js,
// âm thanh từ /js/sfx.js — y hệt trang gốc. webpackIgnore để bundler bỏ qua,
// module tải từ origin lúc chạy (được Next fallback-proxy phục vụ).
//
// Thao tác DOM của trang vanilla → React state + refs. Timer 100ms giữ trong
// ref. Nền gradient teal + card trắng là bản sắc riêng của trang → CSS scoped
// (styled-jsx) với hex gốc, ghi rõ ở risks.
// ============================================================

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const N_QUESTIONS = 10;
const TIME_PER_Q = 15;

type Med = { name: string; short: string; category: string; color: string };
type Question = { med: Med; choices: string[]; correct: string };
type Badge = { id?: string; icon: string; label: string };

// Shape các module legacy import động.
type DrugDb = { MEDICINES: Med[]; ALL_CATEGORIES?: string[] };
type MedicinesMod = { shuffle: <T>(arr: T[]) => T[] };
type ApiMod = {
  ensurePlayerName: () => Promise<string>;
  submitAttempt: (payload: unknown) => Promise<{ newBadges?: Badge[] } | null>;
};
type SfxMod = {
  sfx: { correct(): void; wrong(): void; perfect(): void; badge(): void };
};

// Import động runtime — webpackIgnore giữ path nguyên, tải từ origin đã proxy.
const dyn = <T,>(p: string): Promise<T> =>
  import(/* webpackIgnore: true */ /* @vite-ignore */ p) as Promise<T>;

export default function QuizClient() {
  const [loadError, setLoadError] = useState(false);

  // Modules legacy (nạp 1 lần).
  const modsRef = useRef<{
    medicines: Med[];
    cats: string[];
    shuffle: <T>(arr: T[]) => T[];
    api: ApiMod;
    sfx: SfxMod['sfx'];
  } | null>(null);

  // HUD + trạng thái hiển thị.
  const [qNum, setQNum] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(TIME_PER_Q);
  const [current, setCurrent] = useState<Question | null>(null);
  const [picked, setPicked] = useState<string | null | undefined>(undefined); // undefined=chưa trả lời
  const [result, setResult] = useState<{
    perfect: boolean;
    score: number;
    correctCount: number;
    total: number;
    bestStreak: number;
    durationSec: string;
    newBadges: Badge[];
  } | null>(null);

  // State không cần re-render → ref (giống object `state` trang gốc).
  const st = useRef({
    questions: [] as Question[],
    idx: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    correctCount: 0,
    details: [] as { name: string; category: string; picked: string | null }[],
    timeLeft: TIME_PER_Q,
    startedAt: 0,
  });
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildQuestions = useCallback((n: number): Question[] => {
    const m = modsRef.current!;
    const meds = m.shuffle(m.medicines).slice(0, n);
    return meds.map((med) => {
      const wrong = m.shuffle(m.cats.filter((c) => c !== med.category)).slice(0, 3);
      const choices = m.shuffle([med.category, ...wrong]);
      return { med, choices, correct: med.category };
    });
  }, []);

  const tickTimer = useCallback(() => {
    const s = st.current;
    s.timeLeft = Math.max(0, s.timeLeft - 0.1);
    setTimer(s.timeLeft);
    if (s.timeLeft <= 0) {
      if (timerId.current) clearInterval(timerId.current);
      answer(null);
    }
    // answer ổn định (dùng ref), không cần dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const show = useCallback(
    (q: Question) => {
      const s = st.current;
      setQNum(s.idx + 1);
      setCurrent(q);
      setPicked(undefined);
      s.timeLeft = TIME_PER_Q;
      setTimer(TIME_PER_Q);
      if (timerId.current) clearInterval(timerId.current);
      timerId.current = setInterval(tickTimer, 100);
    },
    [tickTimer],
  );

  const finish = useCallback(async () => {
    const s = st.current;
    const m = modsRef.current!;
    await m.api.ensurePlayerName();
    const durationMs = Date.now() - s.startedAt;
    const res = await m.api.submitAttempt({
      version: 'quiz',
      score: s.score,
      correct: s.correctCount,
      total: s.questions.length,
      durationMs,
      details: { bestStreak: s.bestStreak, questions: s.details },
    });
    const newBadges = res?.newBadges ?? [];
    const perfect = s.correctCount === s.questions.length;
    if (perfect) m.sfx.perfect();
    if (newBadges.length) m.sfx.badge();
    setResult({
      perfect,
      score: s.score,
      correctCount: s.correctCount,
      total: s.questions.length,
      bestStreak: s.bestStreak,
      durationSec: (durationMs / 1000).toFixed(1),
      newBadges,
    });
  }, []);

  const next = useCallback(() => {
    const s = st.current;
    s.idx++;
    if (s.idx >= s.questions.length) finish();
    else show(s.questions[s.idx]);
  }, [finish, show]);

  const answer = useCallback(
    (cat: string | null) => {
      if (timerId.current) clearInterval(timerId.current);
      const s = st.current;
      const m = modsRef.current!;
      const q = s.questions[s.idx];
      const correct = cat === q.correct;
      setPicked(cat);

      if (correct) {
        const bonus = 10 + Math.floor(s.timeLeft); // tối đa 25/câu
        s.score += bonus;
        s.streak++;
        s.bestStreak = Math.max(s.bestStreak, s.streak);
        s.correctCount++;
        m.sfx.correct();
      } else {
        s.streak = 0;
        m.sfx.wrong();
      }
      setScore(s.score);
      setStreak(s.streak);
      s.details.push({ name: q.med.name, category: q.correct, picked: cat });

      nextTimeout.current = setTimeout(next, correct ? 700 : 1200);
    },
    [next],
  );

  const start = useCallback(() => {
    const s = st.current;
    s.questions = buildQuestions(N_QUESTIONS);
    s.idx = 0;
    s.score = 0;
    s.streak = 0;
    s.bestStreak = 0;
    s.correctCount = 0;
    s.details = [];
    s.startedAt = Date.now();
    setScore(0);
    setStreak(0);
    setResult(null);
    show(s.questions[0]);
  }, [buildQuestions, show]);

  // Nạp module legacy 1 lần rồi bắt đầu.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [db, med, api, sfx] = await Promise.all([
          dyn<DrugDb>('/js/engine/drug-db.js'),
          dyn<MedicinesMod>('/js/medicines.js'),
          dyn<ApiMod>('/js/api.js'),
          dyn<SfxMod>('/js/sfx.js'),
        ]);
        if (!alive) return;
        const cats = db.ALL_CATEGORIES ?? [...new Set(db.MEDICINES.map((m) => m.category))];
        modsRef.current = {
          medicines: db.MEDICINES,
          cats,
          shuffle: med.shuffle,
          api,
          sfx: sfx.sfx,
        };
        start();
      } catch {
        if (alive) setLoadError(true);
      }
    })();
    return () => {
      alive = false;
      if (timerId.current) clearInterval(timerId.current);
      if (nextTimeout.current) clearTimeout(nextTimeout.current);
    };
    // start ổn định qua deps của nó; chỉ chạy 1 lần khi mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answered = picked !== undefined;

  return (
    <div className="quiz-root">
      <header className="quiz-header">
        <h1>🧠 Quiz nhanh</h1>
        <span className="sub">
          Nhìn tên thuốc → chọn đúng nhóm điều trị · 10 câu / lượt
        </span>
        <span style={{ flex: 1 }} />
        <Link className="back" href="/">
          ← Trang chính
        </Link>
      </header>

      <div className="hud">
        <div className="hud-item">
          Câu <b>{qNum}</b>/<b>{N_QUESTIONS}</b>
        </div>
        <div className="hud-item">
          Điểm: <b>{score}</b>
        </div>
        <div className="hud-item">⏱️ <b>{timer.toFixed(1)}</b>s</div>
        {streak > 1 && (
          <div className="hud-item">
            🔥 Streak: <b>{streak}</b>
          </div>
        )}
      </div>

      <div className="card-area">
        <div className="progress">
          <div
            className="prog-bar"
            style={{ width: `${(timer / TIME_PER_Q) * 100}%` }}
          />
        </div>

        {loadError ? (
          <div className="med-card">
            <div className="med-name">Không tải được câu hỏi</div>
            <div className="med-q">Hãy thử tải lại trang.</div>
          </div>
        ) : !current ? (
          <div className="med-card">
            <div className="med-name">Đang tải…</div>
          </div>
        ) : (
          <>
            <div
              className="med-card"
              style={{ ['--med-color' as string]: current.med.color }}
            >
              <div className="med-short">{current.med.short}</div>
              <div className="med-name">{current.med.name}</div>
              <div className="med-q">Thuộc nhóm điều trị nào?</div>
            </div>
            <div className="choices">
              {current.choices.map((c, i) => {
                const cls =
                  answered && c === current.correct
                    ? 'choice correct'
                    : answered && c === picked
                      ? 'choice wrong'
                      : 'choice';
                return (
                  <button
                    key={c}
                    className={cls}
                    disabled={answered}
                    onClick={() => answer(c)}
                  >
                    <span className="num">{'ABCD'[i]}</span>
                    {c}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {result && (
        <div className="result-modal">
          <h2>{result.perfect ? '🎉 Perfect!' : '🧠 Xong rồi'}</h2>
          <div className="score-big">{result.score}</div>
          <div style={{ color: '#666', margin: '4px 0 12px' }}>
            Đúng {result.correctCount}/{result.total} · streak cao nhất{' '}
            {result.bestStreak} · {result.durationSec}s
          </div>
          {result.newBadges.length > 0 && (
            <>
              <div style={{ fontSize: 13, color: '#374151' }}>
                🎁 Mở khóa huy hiệu mới:
              </div>
              <div className="badges">
                {result.newBadges.map((b, i) => (
                  <span className="badge" key={b.id ?? i}>
                    {b.icon} {b.label}
                  </span>
                ))}
              </div>
            </>
          )}
          {/* Đóng vòng feedback: link 2 trang trải nghiệm liên quan. */}
          <div className="feedback-links">
            <a className="fl-gold" href="/bang-phong-than">
              🏆 Bảng Phong Thần
            </a>
            <a className="fl-green" href="/cay-tri-thuc">
              🌳 Cây Tri Thức
            </a>
          </div>
          <div style={{ marginTop: 14 }}>
            <button onClick={start}>🔄 Chơi lại</button>
            <button className="secondary" onClick={() => (window.location.href = '/')}>
              ← Về trang chính
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Bản sắc riêng của trang (nền teal + card trắng) → hex gốc từ quiz.html. */
        .quiz-root {
          background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
          color: white;
          padding: 32px 20px;
          margin: -1.5rem calc(50% - 50vw) 0;
          min-height: 100vh;
          font-family: system-ui, sans-serif;
        }
        .quiz-header {
          max-width: 800px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .quiz-header h1 {
          margin: 0;
          font-size: 26px;
        }
        .sub {
          opacity: 0.7;
          font-size: 14px;
        }
        .back {
          color: white;
          text-decoration: none;
          font-size: 13px;
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 12px;
          border-radius: 6px;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .back:hover {
          background: rgba(255, 255, 255, 0.25);
        }
        .hud {
          max-width: 800px;
          margin: 0 auto 18px;
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }
        .hud-item {
          background: rgba(0, 0, 0, 0.25);
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 14px;
        }
        .hud-item b {
          color: #fbbf24;
          font-size: 16px;
        }
        .card-area {
          max-width: 800px;
          margin: 0 auto;
        }
        .med-card {
          background: white;
          color: #1f2937;
          border-radius: 16px;
          padding: 24px 28px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          background: var(--med-color, #43a047);
        }
        .med-name {
          font-size: 32px;
          font-weight: 800;
          margin: 4px 0 6px;
          color: var(--med-color, #43a047);
        }
        .med-short {
          font-size: 13px;
          opacity: 0.6;
          letter-spacing: 1px;
        }
        .med-q {
          font-size: 16px;
          margin-top: 16px;
          color: #444;
        }
        .choices {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }
        .choice {
          background: rgba(255, 255, 255, 0.92);
          color: #1f2937;
          padding: 16px 18px;
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          min-height: 44px;
        }
        .choice:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #fffaf2;
          border-color: #fbbf24;
        }
        .choice:disabled {
          cursor: default;
        }
        .choice.correct {
          background: #d1fae5;
          border-color: #10b981;
          color: #065f46;
        }
        .choice.wrong {
          background: #fee2e2;
          border-color: #ef4444;
          color: #991b1b;
        }
        .num {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 22px;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 50%;
          margin-right: 10px;
          font-size: 12px;
          font-weight: 800;
        }
        .progress {
          height: 6px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .prog-bar {
          height: 100%;
          background: #fbbf24;
          transition: width 0.2s linear;
        }
        .result-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          color: #1f2937;
          padding: 28px 32px;
          border-radius: 16px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
          min-width: 360px;
          max-width: 90vw;
          text-align: center;
          z-index: 20;
        }
        .result-modal h2 {
          margin: 0 0 8px;
        }
        .score-big {
          font-size: 48px;
          font-weight: 800;
          color: #0f766e;
        }
        .result-modal button {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 700;
          background: #0f766e;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin: 4px;
        }
        .result-modal button.secondary {
          background: #f3f4f6;
          color: #374151;
        }
        .badges {
          margin-top: 14px;
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .badge {
          background: #fef3c7;
          color: #92400e;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
        .feedback-links {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .feedback-links a {
          padding: 8px 14px;
          border-radius: 18px;
          text-decoration: none;
          font-weight: 700;
          font-size: 13px;
        }
        .fl-gold {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #3e2723;
        }
        .fl-green {
          background: rgba(34, 197, 94, 0.15);
          color: #15803d;
          border: 1px solid rgba(34, 197, 94, 0.4);
        }
        @media (max-width: 520px) {
          .quiz-root {
            padding: 18px 14px;
          }
          .quiz-header h1 {
            font-size: 22px;
          }
          .choices {
            grid-template-columns: 1fr;
          }
          .choice {
            padding: 14px 16px;
          }
          .med-name {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}
