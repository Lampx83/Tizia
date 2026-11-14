'use client';

// ============================================================
// Bão Số Học — falling-math arcade (port từ public/bao-so-hoc.html).
// 3 mức: easy (+,− trong 20), medium (+,−,× trong 100), hard (+,−,×,÷ trong 1000).
// Mỗi câu rớt 6-9s, 4 đáp án ở dưới. Combo +1 mỗi lần đúng liên tiếp; combo≥3 →
// sét đánh, chớp trắng, điểm gấp. Auto-detect lớp từ /api/auth/me → vào thẳng mức
// tương ứng, không bắt chọn. Mầm non (grade N/0 hoặc ?domain=preschool) → chuyển
// sang Đếm Quả Trên Cây.
//
// PHÉP TÍNH LÀ NỘI DUNG SINH TỰ ĐỘNG (procedural), KHÔNG phải content DB → giữ
// nguyên trong code như trang gốc. Không có danh sách câu hỏi cố định nào cần DB.
//
// Thao tác DOM của trang vanilla được chuyển sang React state + refs. Vòng lặp
// rơi/xoá drop + spawn loop chạy trong effect/callback; particle & bolt dùng
// mảng state có id tự dọn. Storm branding (mây/mưa/sét/màu neon) là bản sắc riêng
// của trang → dùng CSS scoped (styled-jsx) với hex gốc, ghi rõ ở risks.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';

type Level = 'easy' | 'medium' | 'hard';
type Screen = 'start' | 'playing' | 'over';

const LEVELS: Record<Level, { max: number; ops: string[]; spawnMs: number; dur: number }> = {
  easy: { max: 20, ops: ['+', '-'], spawnMs: 2200, dur: 8.5 },
  medium: { max: 100, ops: ['+', '-', '×'], spawnMs: 1900, dur: 7.5 },
  hard: { max: 1000, ops: ['+', '-', '×', '÷'], spawnMs: 1600, dur: 6.5 },
};

const rand = (n: number) => Math.floor(Math.random() * n);
const pick = <T,>(arr: T[]): T => arr[rand(arr.length)];

function genProblem(level: Level): { expr: string; ans: number } {
  const cfg = LEVELS[level];
  const op = pick(cfg.ops);
  let a: number, b: number, ans: number, expr: string;
  switch (op) {
    case '+':
      a = rand(cfg.max);
      b = rand(cfg.max);
      ans = a + b;
      expr = `${a} + ${b}`;
      break;
    case '-':
      a = rand(cfg.max);
      b = rand(a + 1);
      ans = a - b;
      expr = `${a} − ${b}`;
      break;
    case '×': {
      const m = level === 'medium' ? 12 : 25;
      a = rand(m) + 2;
      b = rand(m) + 2;
      ans = a * b;
      expr = `${a} × ${b}`;
      break;
    }
    case '÷': {
      const m = level === 'hard' ? 20 : 12;
      b = rand(m) + 2;
      ans = rand(m) + 1;
      a = b * ans;
      expr = `${a} ÷ ${b}`;
      break;
    }
    default:
      a = 0;
      b = 0;
      ans = 0;
      expr = '0 + 0';
  }
  return { expr, ans };
}

function genChoices(correct: number): number[] {
  const set = new Set<number>([correct]);
  while (set.size < 4) {
    let n = correct + (rand(2) ? 1 : -1) * (rand(8) + 1);
    if (n < 0 || rand(8) === 0) n = correct + (rand(2) ? 1 : -1) * (rand(20) + 1);
    if (n >= 0 && n !== correct) set.add(n);
  }
  return [...set].sort(() => Math.random() - 0.5);
}

// Tự nhận diện lớp → mức chơi. HS lớp nào vào thẳng mức đó.
function gradeToLevel(g: unknown): { lvl: Level; label: string } | null {
  const n = Number(g);
  if (!Number.isFinite(n) || n < 1) return null;
  if (n <= 2) return { lvl: 'easy', label: '🐣 Lớp ' + n + ' · dễ' };
  if (n <= 4) return { lvl: 'medium', label: '🦊 Lớp ' + n + ' · vừa' };
  return { lvl: 'hard', label: '🦅 Lớp ' + n + ' · khó' };
}

type Drop = { id: number; expr: string; ans: number; left: number; dur: number; fx: '' | 'zap' | 'miss' };
type Pop = { id: number; text: string; color?: string; left: number; top: number };
type Bolt = { id: number; left: number; top: number };

let uid = 0;
const nextId = () => ++uid;

export default function BaoSoHocClient() {
  const [screen, setScreen] = useState<Screen>('start');
  const [level, setLevel] = useState<Level>('easy');
  const levelRef = useRef<Level>('easy');

  // Auto-detect state
  const [levelLocked, setLevelLocked] = useState(false); // có grade → khoá, không cho chọn
  const [badgeText, setBadgeText] = useState('🎓 Lớp của em');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerAvailable, setPickerAvailable] = useState(false); // guest/admin: cho mở picker

  // HUD
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [life, setLife] = useState(5);
  const [right, setRight] = useState(0);
  const maxComboRef = useRef(0);

  // Falling drop + answers
  const [drop, setDrop] = useState<Drop | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [answerFx, setAnswerFx] = useState<Record<number, 'good' | 'bad'>>({});

  // Effects
  const [pops, setPops] = useState<Pop[]>([]);
  const [bolts, setBolts] = useState<Bolt[]>([]);
  const [flashOn, setFlashOn] = useState(false);
  const [ambientLeft, setAmbientLeft] = useState('40%');
  const [ambientFire, setAmbientFire] = useState(0); // bump để re-trigger animation

  // Over modal
  const [over, setOver] = useState({ ic: '😅', title: 'Hết tim rồi!', msg: '', score: 0, combo: 0, right: 0 });

  // Mutable refs shared với timers (tránh stale closure)
  const runningRef = useRef(false);
  const currentDropRef = useRef<Drop | null>(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const lifeRef = useRef(5);
  const rightRef = useRef(0);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const setLevelBoth = (l: Level) => {
    levelRef.current = l;
    setLevel(l);
  };

  // ── Ambient storm: sét nền tự đánh 3-7s/lần + chớp trắng nhẹ ─────
  const ambientTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const fire = () => {
      setAmbientLeft(8 + Math.random() * 84 + '%');
      setAmbientFire((n) => n + 1);
      setFlashOn(true);
      setTimeout(() => setFlashOn(false), 90);
      ambientTimerRef.current = setTimeout(fire, 2800 + Math.random() * 4000);
    };
    ambientTimerRef.current = setTimeout(fire, 800 + Math.random() * 1200);
    return () => {
      if (ambientTimerRef.current) clearTimeout(ambientTimerRef.current);
    };
  }, []);

  // ── Auto-detect grade từ /api/auth/me ───────────────────────────
  useEffect(() => {
    (async () => {
      // Mầm non: game này chưa phù hợp → chuyển sang Đếm Quả (trang legacy vanilla).
      try {
        const dom = new URLSearchParams(window.location.search).get('domain');
        if (dom === 'preschool') {
          window.location.replace('/dem-qua');
          return;
        }
      } catch {}

      let grade: unknown = null;
      try {
        const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
        if (r.ok) grade = (await r.json())?.user?.grade ?? null;
      } catch {}

      if (grade === 'N' || grade === 0) {
        window.location.replace('/dem-qua');
        return;
      }

      const map = gradeToLevel(grade);
      if (map) {
        setLevelBoth(map.lvl);
        setLevelLocked(true);
        setBadgeText(map.label);
      } else {
        // Không có grade (admin/guest test) — mặc định easy, cho phép mở picker.
        setLevelBoth('easy');
        setPickerAvailable(true);
        setBadgeText('🐣 Mặc định: Lớp 1-2 (bấm để đổi)');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spawnPop = useCallback((text: string, left: number, top: number, color?: string) => {
    const id = nextId();
    setPops((p) => [...p, { id, text, left, top, color }]);
    setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 1100);
  }, []);

  const spawnBolt = useCallback((left: number, top: number) => {
    const id = nextId();
    setBolts((b) => [...b, { id, left, top }]);
    setTimeout(() => setBolts((b) => b.filter((x) => x.id !== id)), 600);
  }, []);

  const flash = useCallback(() => {
    setFlashOn(true);
    setTimeout(() => setFlashOn(false), 90);
  }, []);

  const gameOver = useCallback(() => {
    runningRef.current = false;
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    currentDropRef.current = null;
    setDrop(null);
    setAnswers([]);

    const s = scoreRef.current;
    let ic: string, title: string, msg: string;
    if (s >= 300) {
      ic = '🏆';
      title = 'Tuyệt vời!';
      msg = 'Em là cao thủ Bão Số Học — sét đánh đầu các con tính!';
    } else if (s >= 150) {
      ic = '🌟';
      title = 'Giỏi quá!';
      msg = 'Em đã tính rất tốt. Cố thêm chút nữa là phá kỉ lục!';
    } else if (s >= 60) {
      ic = '👍';
      title = 'Khá đó!';
      msg = 'Em đang tiến bộ. Luyện thêm để giữ combo lâu hơn nhé.';
    } else {
      ic = '🌱';
      title = 'Cố lên!';
      msg = 'Đừng nản — mỗi lần chơi là một lần em giỏi hơn.';
    }
    setOver({ ic, title, msg, score: s, combo: maxComboRef.current, right: rightRef.current });
    setScreen('over');

    // Lưu điểm cao (localStorage như trang gốc)
    try {
      const key = 'bao-so-hoc.best.' + levelRef.current;
      const prev = Number(localStorage.getItem(key) || 0);
      if (s > prev) localStorage.setItem(key, String(s));
    } catch {}

    // Sync wallet XP nếu đã đăng nhập (best-effort). Guest chơi offline vẫn được.
    try {
      const xpGain = Math.floor(s / 10);
      if (xpGain > 0) {
        fetch('/api/wallet', { credentials: 'same-origin' })
          .then((r) => (r.ok ? r.json() : null))
          .then((w) => {
            if (!w) return;
            fetch('/api/wallet', {
              method: 'PUT',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...w, xp: (w.xp || 0) + xpGain }),
            });
          })
          .catch(() => {});
      }
    } catch {}
  }, []);

  const spawn = useCallback(() => {
    if (!runningRef.current || currentDropRef.current) return;
    const lvl = levelRef.current;
    const cfg = LEVELS[lvl];
    const p = genProblem(lvl);
    const w = typeof window !== 'undefined' ? window.innerWidth : 800;
    const left = 60 + rand(Math.max(1, w - 240));
    const d: Drop = { id: nextId(), expr: p.expr, ans: p.ans, left, dur: cfg.dur, fx: '' };
    currentDropRef.current = d;
    setDrop(d);
    setAnswers(genChoices(p.ans));
    setAnswerFx({});
  }, []);

  const scheduleSpawn = useCallback(
    (ms: number) => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      spawnTimerRef.current = setTimeout(spawn, ms);
    },
    [spawn],
  );

  const onMiss = useCallback(() => {
    if (!currentDropRef.current) return;
    comboRef.current = 0;
    setCombo(0);
    lifeRef.current -= 1;
    setLife(lifeRef.current);
    currentDropRef.current = null;
    setDrop(null);
    setAnswers([]);
    if (lifeRef.current <= 0) return gameOver();
    scheduleSpawn(600);
  }, [gameOver, scheduleSpawn]);

  const onAnswer = useCallback(
    (val: number) => {
      const cur = currentDropRef.current;
      if (!cur) return;
      const correct = cur.ans;
      const rect = gameRef.current?.getBoundingClientRect();
      const popLeft = cur.left + 40;
      const popTop = rect ? rect.height - 220 : 200;

      if (val === correct) {
        const gain = 10 + comboRef.current * 5;
        scoreRef.current += gain;
        setScore(scoreRef.current);
        comboRef.current += 1;
        setCombo(comboRef.current);
        maxComboRef.current = Math.max(maxComboRef.current, comboRef.current);
        rightRef.current += 1;
        setRight(rightRef.current);
        setAnswerFx({ [val]: 'good' });
        setDrop((d) => (d && d.id === cur.id ? { ...d, fx: 'zap' } : d));
        spawnPop('+' + (10 + (comboRef.current - 1) * 5), popLeft, popTop);
        if (comboRef.current >= 3) {
          spawnBolt(cur.left + 10, popTop - 20);
          flash();
        }
      } else {
        comboRef.current = 0;
        setCombo(0);
        lifeRef.current -= 1;
        setLife(lifeRef.current);
        setAnswerFx({ [val]: 'bad' });
        setDrop((d) => (d && d.id === cur.id ? { ...d, fx: 'miss' } : d));
        spawnPop('✗', popLeft, popTop, '#ef4444');
      }

      currentDropRef.current = null;
      const finishedId = cur.id;
      setTimeout(() => setDrop((d) => (d && d.id === finishedId ? null : d)), 350);
      setTimeout(() => setAnswers([]), 350);

      if (lifeRef.current <= 0) return gameOver();
      scheduleSpawn(350);
    },
    [flash, gameOver, scheduleSpawn, spawnBolt, spawnPop],
  );

  const start = useCallback(
    (lvl: Level) => {
      setLevelBoth(lvl);
      scoreRef.current = 0;
      comboRef.current = 0;
      maxComboRef.current = 0;
      lifeRef.current = 5;
      rightRef.current = 0;
      setScore(0);
      setCombo(0);
      setLife(5);
      setRight(0);
      setPops([]);
      setBolts([]);
      currentDropRef.current = null;
      setDrop(null);
      setAnswers([]);
      runningRef.current = true;
      setScreen('playing');
      spawn();
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = setInterval(() => {
        if (!currentDropRef.current) spawn();
      }, LEVELS[lvl].spawnMs);
    },
    [spawn],
  );

  // Cleanup timers khi unmount
  useEffect(() => {
    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, []);

  return (
    <div className="bsh-root">
      <div id="game" ref={gameRef}>
        <div className="cloud-bg" />
        <div className="cloud-bg layer2" />
        <div className="rain" />
        <div className="rain layer2" />
        <div className="rain layer3" />
        <div
          key={ambientFire}
          className={ambientFire ? 'ambient-bolt fire' : 'ambient-bolt'}
          style={{ left: ambientLeft }}
        />
        <div className={flashOn ? 'flash on' : 'flash'} />

        {/* HUD */}
        <div className="hud">
          <a className="back" href="/">
            ← Tizia
          </a>
          <div className="stats">
            <span className="pill">
              ⭐ Điểm: <b>{score}</b>
            </span>
            <span className="pill combo">
              ⚡ Combo: <b>{combo}</b>
            </span>
            <span className="pill life">
              ❤️ Tim: <b>{life}</b>
            </span>
            <span className="pill">
              🎯 Đúng: <b>{right}</b>
            </span>
          </div>
        </div>

        {/* Falling drop */}
        {drop && (
          <div
            key={drop.id}
            className={'drop' + (drop.fx ? ' ' + drop.fx : '')}
            style={{ left: drop.left + 'px', ['--dur' as string]: drop.dur + 's' }}
            onAnimationEnd={(e) => {
              // Chỉ 'fall' (rơi chạm đất) mới tính miss; zap/miss/shake là fx phụ.
              if (e.animationName.startsWith('fall') === false) return;
              if (currentDropRef.current && currentDropRef.current.id === drop.id) onMiss();
            }}
          >
            {drop.expr} = ?
          </div>
        )}

        {/* Answer buttons */}
        <div id="answers">
          {answers.map((a) => (
            <button
              key={a}
              className={'ans' + (answerFx[a] ? ' ' + answerFx[a] : '')}
              onClick={() => onAnswer(a)}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Pops */}
        {pops.map((p) => (
          <div key={p.id} className="pop" style={{ left: p.left + 'px', top: p.top + 'px', color: p.color }}>
            {p.text}
          </div>
        ))}
        {/* Bolts */}
        {bolts.map((b) => (
          <div key={b.id} className="bolt" style={{ left: b.left + 'px', top: b.top + 'px' }}>
            ⚡
          </div>
        ))}

        {/* Start modal */}
        {screen === 'start' && (
          <div className="modal">
            <div className="card">
              <div className="ic">⛈️</div>
              <h1>Bão Số Học</h1>
              <p>
                Phép tính rơi như mưa. Bấm đáp án đúng trước khi chúng chạm đất nhé! Combo cao = sét đánh, điểm
                gấp đôi.
              </p>
              {pickerOpen && (
                <div className="levels">
                  {(
                    [
                      { lvl: 'easy', label: '🐣 Lớp 1-2' },
                      { lvl: 'medium', label: '🦊 Lớp 3-4' },
                      { lvl: 'hard', label: '🦅 Lớp 5+' },
                    ] as { lvl: Level; label: string }[]
                  ).map((o) => (
                    <button
                      key={o.lvl}
                      className={'lv' + (level === o.lvl ? ' on' : '')}
                      onClick={() => setLevelBoth(o.lvl)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
              {!pickerOpen && (
                <div className="levels">
                  <span
                    className="lv on"
                    style={pickerAvailable ? { cursor: 'pointer' } : undefined}
                    onClick={() => {
                      if (pickerAvailable) setPickerOpen(true);
                    }}
                  >
                    {badgeText}
                  </span>
                </div>
              )}
              <button className="start" onClick={() => start(level)}>
                ▶ Bắt đầu
              </button>
            </div>
          </div>
        )}

        {/* Game over modal */}
        {screen === 'over' && (
          <div className="modal">
            <div className="card">
              <div className="ic">{over.ic}</div>
              <h1>{over.title}</h1>
              <div className="scoreboard">
                <b>{over.score}</b>
                điểm · combo cao nhất <span>{over.combo}</span> · trả lời đúng <span>{over.right}</span>
              </div>
              <p>{over.msg}</p>
              <button className="start" onClick={() => start(level)}>
                🔁 Chơi lại
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .bsh-root {
          --bg-1: #0c1a3a;
          --bg-2: #142554;
          --bg-3: #1a3375;
          --neon: #fbbf24;
          --good: #10b981;
          --bad: #ef4444;
          --cool: #38bdf8;
          position: fixed;
          inset: 0;
          color: #fff;
          font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
          background: linear-gradient(180deg, var(--bg-1), var(--bg-2) 55%, var(--bg-3));
          overflow: hidden;
          z-index: 40;
        }
        #game {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .cloud-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.55;
          z-index: 0;
          background: radial-gradient(ellipse 60% 55% at 10% 15%, rgba(255, 255, 255, 0.22) 0%, transparent 62%),
            radial-gradient(ellipse 50% 45% at 38% 8%, rgba(255, 255, 255, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 65% 50% at 70% 18%, rgba(255, 255, 255, 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 92% 10%, rgba(255, 255, 255, 0.18) 0%, transparent 60%);
          background-size: 100% 240px;
          background-repeat: no-repeat;
          background-position: 0 0;
          animation: drift-cloud 28s linear infinite;
          filter: blur(2px);
        }
        .cloud-bg.layer2 {
          opacity: 0.32;
          height: 140px;
          top: 60px;
          background: radial-gradient(ellipse 70% 60% at 25% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 75% 35%, rgba(255, 255, 255, 0.26) 0%, transparent 60%);
          animation: drift-cloud-rev 42s linear infinite;
          filter: blur(3px);
        }
        @keyframes drift-cloud {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-180px);
          }
        }
        @keyframes drift-cloud-rev {
          from {
            transform: translateX(-220px);
          }
          to {
            transform: translateX(0);
          }
        }

        .rain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.55;
          background-image: linear-gradient(transparent 0%, rgba(180, 220, 255, 0.3) 50%, transparent 100%);
          background-size: 2px 90px;
          background-repeat: repeat;
          animation: rain-fall 0.55s linear infinite;
        }
        .rain.layer2 {
          opacity: 0.3;
          background-size: 2px 60px;
          animation-duration: 0.42s;
          transform: translateX(20px);
        }
        .rain.layer3 {
          opacity: 0.18;
          background-size: 1px 120px;
          animation-duration: 0.78s;
          transform: translateX(-15px);
        }
        @keyframes rain-fall {
          from {
            background-position: 0 -90px;
          }
          to {
            background-position: 0 90px;
          }
        }

        .ambient-bolt {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 3px;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(56, 189, 248, 0.7) 50%, transparent 100%);
          box-shadow: 0 0 18px 4px rgba(255, 255, 255, 0.7), 0 0 60px 10px rgba(56, 189, 248, 0.45);
          opacity: 0;
          transform-origin: top center;
        }
        .ambient-bolt.fire {
          animation: bolt-strike 0.35s ease-out;
        }
        @keyframes bolt-strike {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          15% {
            opacity: 1;
            transform: scaleY(1);
          }
          35% {
            opacity: 0.8;
          }
          55% {
            opacity: 0;
          }
          65% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: scaleY(1);
          }
        }

        .flash {
          position: absolute;
          inset: 0;
          background: #fff;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.08s;
          z-index: 3;
        }
        .flash.on {
          opacity: 0.45;
        }

        .hud {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          z-index: 8;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .back {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          padding: 7px 14px;
          border-radius: 18px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .back:hover {
          background: rgba(255, 255, 255, 0.18);
        }
        .stats {
          display: flex;
          gap: 7px;
          margin-left: auto;
          flex-wrap: wrap;
        }
        .pill {
          background: rgba(15, 23, 42, 0.7);
          padding: 6px 13px;
          border-radius: 18px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .pill :global(b) {
          color: var(--neon);
        }
        .pill.life :global(b) {
          color: var(--bad);
        }
        .pill.combo :global(b) {
          color: var(--cool);
        }

        .drop {
          position: absolute;
          top: -80px;
          padding: 10px 18px;
          background: linear-gradient(180deg, #fff, #dde7f5);
          color: #0c1a3a;
          border-radius: 14px;
          font-weight: 900;
          font-size: 24px;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4);
          animation: fall var(--dur, 7s) linear forwards;
          user-select: none;
          cursor: default;
          will-change: top, transform;
          z-index: 5;
        }
        .drop::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 10px solid #38bdf8;
        }
        .drop.zap {
          animation: fall var(--dur, 7s) linear forwards, zap 0.3s ease-out forwards;
        }
        @keyframes fall {
          0% {
            top: -80px;
          }
          100% {
            top: calc(100% - 220px);
          }
        }
        @keyframes zap {
          0% {
            transform: scale(1);
            background: linear-gradient(180deg, #fff, #10b981);
          }
          50% {
            transform: scale(1.3) rotate(8deg);
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        .drop.miss {
          animation: fall var(--dur, 7s) linear forwards, shake 0.3s ease-out;
          background: linear-gradient(180deg, #fee2e2, #ef4444);
          color: #fff;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-12px);
          }
          75% {
            transform: translateX(12px);
          }
        }

        #answers {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          width: 96%;
          max-width: 560px;
        }
        .ans {
          flex: 1 1 80px;
          min-width: 80px;
          padding: 18px 14px;
          font-size: 26px;
          font-weight: 900;
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.12s, background 0.15s;
          backdrop-filter: blur(8px);
        }
        .ans:hover {
          background: rgba(251, 191, 36, 0.25);
          border-color: var(--neon);
          transform: translateY(-3px);
        }
        .ans:active {
          transform: translateY(-1px) scale(0.95);
        }
        .ans.good {
          background: rgba(16, 185, 129, 0.6);
          border-color: var(--good);
          animation: bump 0.25s;
        }
        .ans.bad {
          background: rgba(239, 68, 68, 0.6);
          border-color: var(--bad);
          animation: bump 0.25s;
        }
        @keyframes bump {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .modal {
          position: absolute;
          inset: 0;
          z-index: 20;
          background: rgba(8, 15, 34, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .card {
          background: linear-gradient(180deg, #1c2c5c, #102046);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 32px 36px;
          max-width: 440px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }
        .card .ic {
          font-size: 64px;
        }
        .card h1 {
          font-size: 28px;
          margin: 8px 0 6px;
        }
        .card p {
          margin: 0 0 18px;
          opacity: 0.85;
          font-size: 14.5px;
          line-height: 1.6;
        }
        .card .levels {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 14px 0 18px;
          flex-wrap: wrap;
        }
        .card .lv {
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          cursor: pointer;
          font-weight: 800;
          transition: all 0.15s;
          font-size: 14px;
          min-width: 90px;
        }
        .card .lv:hover,
        .card .lv.on {
          background: var(--neon);
          color: #1c1502;
          border-color: transparent;
        }
        .card button.start {
          padding: 13px 32px;
          background: var(--neon);
          color: #1c1502;
          font-weight: 900;
          border: none;
          border-radius: 18px;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(251, 191, 36, 0.4);
        }
        .card button.start:hover {
          filter: brightness(1.08);
        }
        .scoreboard {
          background: rgba(15, 23, 42, 0.5);
          padding: 14px 18px;
          border-radius: 12px;
          margin: 8px 0 16px;
        }
        .scoreboard :global(b) {
          color: var(--neon);
          font-size: 36px;
          display: block;
        }

        .pop {
          position: absolute;
          pointer-events: none;
          font-size: 24px;
          font-weight: 900;
          color: var(--neon);
          animation: pop-up 1.1s ease-out forwards;
          z-index: 7;
        }
        @keyframes pop-up {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-90px);
            opacity: 0;
          }
        }

        .bolt {
          position: absolute;
          pointer-events: none;
          font-size: 60px;
          z-index: 7;
          animation: bolt-flash 0.6s ease-out forwards;
        }
        @keyframes bolt-flash {
          0% {
            transform: scale(0) rotate(-20deg);
            opacity: 1;
          }
          40% {
            transform: scale(1.4) rotate(0);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
