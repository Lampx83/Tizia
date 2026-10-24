'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Bộ thẻ từ vựng lấy từ DB qua /api/content/lop2-anh-memory (KHÔNG hardcode content).
type PoolItem = { en: string; vi: string; emo: string };
type ContentRes = { ok?: boolean; items?: PoolItem[] };

// 1 lá bài trên lưới: thuộc cặp `pair`, mặt tiếng Anh hoặc tiếng Việt.
type CardT = { pair: number; kind: 'en' | 'vi'; label: string; emo: string };

const PAIRS_PER_GAME = 6;
const BEST_KEY = 'lop2-anh-memory.best';

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Lop2AnhMemoryClient() {
  const [pool, setPool] = useState<PoolItem[]>([]);
  const [cards, setCards] = useState<CardT[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]); // chỉ số các lá đang lật chờ so
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [bad, setBad] = useState<number[]>([]); // 2 lá vừa sai (rung)
  const [moves, setMoves] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [locked, setLocked] = useState(false);
  const [over, setOver] = useState<null | { score: number; moves: number; secs: number; best: number; title: string; msg: string }>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t0Ref = useRef(0);
  const startedRef = useRef(false);

  // Nạp bộ thẻ từ DB.
  useEffect(() => {
    fetch('/api/content/lop2-anh-memory', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j: ContentRes) => setPool(j.items || []))
      .catch(() => setPool([]));
  }, []);

  const build = useCallback(() => {
    if (pool.length === 0) return;
    const picks = shuffle(pool).slice(0, PAIRS_PER_GAME);
    const deck: CardT[] = [];
    picks.forEach((p, i) => {
      deck.push({ pair: i, kind: 'en', label: p.en, emo: p.emo });
      deck.push({ pair: i, kind: 'vi', label: p.vi, emo: p.emo });
    });
    setCards(shuffle(deck));
    setFlipped([]);
    setMatched(new Set());
    setBad([]);
    setMoves(0);
    setPairs(0);
    setSeconds(0);
    setLocked(false);
    setOver(null);
    startedRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [pool]);

  // Dựng ván khi có bộ thẻ.
  useEffect(() => {
    build();
  }, [build]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const start = useCallback(() => {
    t0Ref.current = performance.now();
    timerRef.current = setInterval(() => {
      setSeconds(Math.floor((performance.now() - t0Ref.current) / 1000));
    }, 200);
  }, []);

  const end = useCallback(
    (finalMoves: number) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const secs = Math.floor((performance.now() - t0Ref.current) / 1000);
      // score: 1200 điểm cơ bản - phạt lượt - phạt thời gian, tối thiểu 50
      const score = Math.max(50, 1200 - finalMoves * 30 - secs * 4);
      let best = score;
      try {
        const prev = Number(localStorage.getItem(BEST_KEY) || 0);
        best = Math.max(prev, score);
        if (score > prev) localStorage.setItem(BEST_KEY, String(score));
      } catch {
        /* localStorage có thể bị chặn */
      }
      const title = finalMoves <= 14 ? '🏆 Tuyệt vời!' : finalMoves <= 20 ? '🌟 Giỏi quá!' : '👍 Hoàn thành!';
      const msg = finalMoves <= 14 ? 'Trí nhớ siêu phàm!' : 'Chơi lại để phá kỉ lục nhé!';
      setOver({ score, moves: finalMoves, secs, best, title, msg });

      // Sync XP
      try {
        const xp = Math.floor(score / 15);
        if (xp > 0) {
          fetch('/api/wallet', { credentials: 'include' })
            .then((r) => (r.ok ? r.json() : null))
            .then((w) => {
              if (!w) return;
              fetch('/api/wallet', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...w, xp: (w.xp || 0) + xp }),
              });
            })
            .catch(() => {});
        }
      } catch {
        /* noop */
      }
    },
    [],
  );

  const onFlip = useCallback(
    (idx: number) => {
      if (locked) return;
      if (matched.has(idx) || flipped.includes(idx)) return;
      if (!startedRef.current) {
        startedRef.current = true;
        start();
      }
      const next = [...flipped, idx];
      setFlipped(next);
      if (next.length === 2) {
        const [a, b] = next;
        const newMoves = moves + 1;
        setMoves(newMoves);
        if (cards[a].pair === cards[b].pair && cards[a].kind !== cards[b].kind) {
          const nm = new Set(matched);
          nm.add(a);
          nm.add(b);
          setMatched(nm);
          const newPairs = pairs + 1;
          setPairs(newPairs);
          setFlipped([]);
          if (newPairs === PAIRS_PER_GAME) setTimeout(() => end(newMoves), 400);
        } else {
          setLocked(true);
          setBad([a, b]);
          setTimeout(() => {
            setBad([]);
            setFlipped([]);
            setLocked(false);
          }, 720);
        }
      }
    },
    [locked, matched, flipped, moves, pairs, cards, start, end],
  );

  return (
    <div className="l2mem">
      <style>{CSS}</style>

      <div className="top">
        <Link className="back" href="/space?b=g2&domain=primary">
          ← Lớp 2
        </Link>
        <div>
          <h1>🎴 Memory Match</h1>
          <div className="sub">Tiếng Anh Lớp 2 — lật thẻ ghép cặp Anh ↔ Việt</div>
        </div>
        <div className="right">
          <div className="stat">
            ⏱ <span className="v">{seconds}s</span>
          </div>
          <div className="stat">
            🎯 <span className="v">{moves}</span>
          </div>
          <div className="stat">
            ⭐ <span className="v">{pairs}/{PAIRS_PER_GAME}</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <p className="intro">
          Bấm để lật. Tìm cặp <b>tiếng Anh ↔ tiếng Việt</b> đúng nghĩa. Càng ít lượt — càng nhiều XP!
        </p>
        <div className="grid">
          {cards.map((c, idx) => {
            const isMatch = matched.has(idx);
            const isFlip = flipped.includes(idx);
            const isBad = bad.includes(idx);
            const cls = ['cell', isFlip && !isMatch ? 'flip' : '', isMatch ? 'match' : '', isBad ? 'bad' : '']
              .filter(Boolean)
              .join(' ');
            return (
              <div key={idx} className={cls} onClick={() => onFlip(idx)}>
                <div className="inner">
                  <div className="face front">?</div>
                  <div className="face back">
                    <div className="emo">{c.emo}</div>
                    {c.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {over && (
        <div className="modal">
          <div className="panel">
            <div className="ic">🏆</div>
            <h2>{over.title}</h2>
            <p>{over.msg}</p>
            <p>
              Điểm: <b>{over.score}</b> · Lượt: <b>{over.moves}</b> · Thời gian: <b>{over.secs}s</b>
            </p>
            <p>
              Best: <b>{over.best}</b>
            </p>
            <div className="row">
              <button className="btn" onClick={build}>
                🔁 Chơi lại
              </button>
              <Link className="btn ghost" href="/space?b=g2&domain=primary">
                ← Về Lớp 2
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// CSS scoped của trang gốc — giữ nguyên phong cách sáng, vui nhộn cho học sinh lớp 2
// (khác theme tối mặc định của web-next). Tất cả selector nằm dưới .l2mem.
const CSS = `
.l2mem { --bg-1:#eef2ff; --bg-2:#dbeafe; --accent:#3b82f6; --ok:#22c55e; --bad:#ef4444;
  --card:#ffffff; --border:rgba(0,0,0,.08); --ink:#1f2937; --muted:#6b7280; --back:#1e3a8a;
  color:var(--ink); font-family:'Inter','Quicksand',system-ui,sans-serif;
  margin:-1rem 0; border-radius:16px; overflow:hidden;
  background:radial-gradient(ellipse 90% 50% at 50% 0%, #dbeafe, transparent),linear-gradient(180deg,var(--bg-1),#e0e7ff); }
.l2mem *{box-sizing:border-box}
.l2mem .top{display:flex;align-items:center;gap:14px;padding:12px 18px;border-bottom:1px solid var(--border);background:rgba(255,255,255,.7);position:sticky;top:0;z-index:5;backdrop-filter:blur(8px)}
.l2mem .back{color:var(--ink);text-decoration:none;opacity:.85;font-size:14px;background:rgba(0,0,0,.06);padding:8px 14px;border-radius:10px;font-weight:600}
.l2mem .back:hover{background:rgba(0,0,0,.12)}
.l2mem .top h1{margin:0;font-size:18px;font-weight:800}
.l2mem .top .sub{font-size:12.5px;opacity:.6;font-weight:500}
.l2mem .top .right{margin-left:auto;display:flex;gap:10px;align-items:center;font-size:13.5px}
.l2mem .stat{background:white;border:1px solid var(--border);border-radius:14px;padding:7px 13px;font-weight:700}
.l2mem .stat .v{color:var(--accent);font-size:16px}
.l2mem .wrap{max-width:720px;margin:0 auto;padding:24px 18px 60px}
.l2mem .intro{text-align:center;margin:6px 0 18px;opacity:.85;font-size:14px}
.l2mem .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.l2mem .cell{aspect-ratio:3/4;perspective:800px;cursor:pointer}
.l2mem .inner{position:relative;width:100%;height:100%;transition:transform .45s;transform-style:preserve-3d}
.l2mem .cell.flip .inner,.l2mem .cell.match .inner{transform:rotateY(180deg)}
.l2mem .face{position:absolute;inset:0;border-radius:14px;display:flex;align-items:center;justify-content:center;backface-visibility:hidden;
  border:1.5px solid var(--border);font-weight:800;text-align:center;padding:6px;box-shadow:0 6px 16px rgba(0,0,0,.06)}
.l2mem .face.front{background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;font-size:34px}
.l2mem .face.back{background:#fff;color:var(--ink);transform:rotateY(180deg);font-size:18px;line-height:1.2}
.l2mem .face.back .emo{font-size:30px;margin-bottom:4px}
.l2mem .cell.match .face.back{background:#dcfce7;border-color:#22c55e}
.l2mem .cell.bad .face.back{background:#fee2e2;border-color:#ef4444;animation:l2mem-shake .35s}
@keyframes l2mem-shake{0%,100%{transform:rotateY(180deg) translateX(0)}25%{transform:rotateY(180deg) translateX(-4px)}75%{transform:rotateY(180deg) translateX(4px)}}
.l2mem .modal{position:fixed;inset:0;background:rgba(15,23,42,.65);display:flex;align-items:center;justify-content:center;padding:20px;z-index:50}
.l2mem .panel{background:#fff;border-radius:20px;max-width:380px;width:100%;padding:28px 26px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.l2mem .panel .ic{font-size:64px;margin-bottom:6px}
.l2mem .panel h2{margin:6px 0 8px;font-size:22px}
.l2mem .panel p{margin:4px 0;color:var(--muted);font-size:14px}
.l2mem .panel .row{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.l2mem .btn{padding:10px 18px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-weight:700;cursor:pointer;font-size:14px;text-decoration:none;display:inline-block}
.l2mem .btn.ghost{background:rgba(0,0,0,.06);color:var(--ink)}
.l2mem .btn:hover{filter:brightness(1.08)}
`;
