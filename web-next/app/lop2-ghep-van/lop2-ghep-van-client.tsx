'use client';

// ============================================================
// Ghép vần Tiếng Việt Lớp 2 — port từ public/lop2-ghep-van.html.
// Mỗi vòng hiện 1 tiếng + nghĩa gợi ý; bé chọn 1 âm đầu + 1 vần + 1 dấu thanh
// để ghép đúng. 10 vòng/lần chơi, random từ pool. Đúng → +1 điểm.
//
// CONTENT (ROUNDS): bộ vần — mỗi tiếng gồm { word, meaning, onset, rhyme, tone }
// — LẤY TỪ DB qua /api/content/lop2-ghep-van (KHÔNG hardcode). TONES (6 dấu thanh
// tiếng Việt) là cấu trúc ngôn ngữ cố định, không phải content học → giữ trong code
// như trang gốc. ALL_ONSETS/ALL_RHYMES chỉ là bộ sinh "phân tâm" (noise) cho ô chọn,
// không phải nội dung bài học → giữ trong code như trang gốc.
//
// Thao tác DOM của trang vanilla chuyển sang React state (selOnset/selRhyme/selTone,
// pools per round) + refs cho stale-closure. Điểm/attempt lưu qua /api/attempts.
// Bảng màu cam/vàng là bản sắc riêng của trang → giữ hex gốc trong styled-jsx
// scoped, ghi rõ ở risks.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';

type Round = { word: string; meaning: string; onset: string; rhyme: string; tone: string };
type Tone = { id: string; label: string; sym: string };

// 6 dấu thanh tiếng Việt: ngang (không dấu) · huyền · sắc · hỏi · ngã · nặng.
// Cấu trúc ngôn ngữ cố định — không phải content học.
const TONES: Tone[] = [
  { id: 'ngang', label: '(không dấu)', sym: 'a' },
  { id: 'huyen', label: 'huyền', sym: 'à' },
  { id: 'sac', label: 'sắc', sym: 'á' },
  { id: 'hoi', label: 'hỏi', sym: 'ả' },
  { id: 'nga', label: 'ngã', sym: 'ã' },
  { id: 'nang', label: 'nặng', sym: 'ạ' },
];

// Bộ sinh "phân tâm" (noise) cho ô chọn — không phải nội dung bài học.
const ALL_ONSETS = ['b', 'm', 'c', 't', 's', 'ch', 'ng', 'tr', 'nh', 'x', 'd', 'l', 'k', 'h'];
const ALL_RHYMES = ['an', 'eo', 'a', 'ay', 'ach', 'im', 'ương', 'iên', 'ưa', 'ai', 'ong', 'ung', 'am', 'o', 'u', 'anh'];

const N_ROUNDS = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const toneLabel = (id: string) => TONES.find((t) => t.id === id)?.label || id;
const toneSymOf = (id: string) => TONES.find((t) => t.id === id)?.sym || '_';

type Pools = { onsets: string[]; rhymes: string[]; tones: string[] };

function buildPools(r: Round): Pools {
  const onsets = shuffle([r.onset, ...shuffle(ALL_ONSETS.filter((x) => x !== r.onset)).slice(0, 3)]);
  const rhymes = shuffle([r.rhyme, ...shuffle(ALL_RHYMES.filter((x) => x !== r.rhyme)).slice(0, 3)]);
  const tones = shuffle([r.tone, ...shuffle(TONES.map((t) => t.id).filter((x) => x !== r.tone)).slice(0, 3)]);
  return { onsets, rhymes, tones };
}

type Feedback = { kind: 'ok' | 'bad'; html: string } | null;

export default function Lop2GhepVanClient() {
  const [allRounds, setAllRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [pools, setPools] = useState<Pools | null>(null);
  const [selOnset, setSelOnset] = useState<string | null>(null);
  const [selRhyme, setSelRhyme] = useState<string | null>(null);
  const [selTone, setSelTone] = useState<string | null>(null);
  const [consumed, setConsumed] = useState(false); // sau khi kiểm tra, khoá các ô tới vòng sau
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [finished, setFinished] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [backHref, setBackHref] = useState('/school?domain=primary#campus-hero');

  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idxRef = useRef(0);
  const scoreRef = useRef(0);
  const roundsRef = useRef<Round[]>([]);

  idxRef.current = idx;
  scoreRef.current = score;
  roundsRef.current = rounds;

  const startRoundAt = useCallback((i: number, list: Round[]) => {
    setPools(buildPools(list[i]));
    setSelOnset(null);
    setSelRhyme(null);
    setSelTone(null);
    setConsumed(false);
    setFeedback(null);
  }, []);

  const beginGame = useCallback(
    (pool: Round[]) => {
      const r = shuffle(pool).slice(0, N_ROUNDS);
      startTimeRef.current = Date.now();
      setRounds(r);
      roundsRef.current = r;
      setIdx(0);
      idxRef.current = 0;
      setScore(0);
      scoreRef.current = 0;
      setFinished(false);
      if (r.length > 0) startRoundAt(0, r);
    },
    [startRoundAt],
  );

  // Đường về theo ?domain.
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get('domain');
    if (d) setBackHref('/space?domain=' + encodeURIComponent(d));
  }, []);

  // Nạp bộ vần từ DB (API) rồi bắt đầu ván.
  useEffect(() => {
    let alive = true;
    fetch('/api/content/lop2-ghep-van', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j) => (j.items || []) as Round[])
      .catch(() => [] as Round[])
      .then((items) => {
        if (!alive) return;
        setAllRounds(items);
        setLoading(false);
        if (items.length > 0) beginGame(items);
      });
    return () => {
      alive = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAttempt = useCallback((finalScore: number, playedRounds: Round[]) => {
    // Lưu attempts để xuất hiện trong leaderboard / hồ sơ học tập. Server lấy
    // player_name từ session. Guest (401) → degrade mượt (toast), không redirect.
    let classCode: string | undefined;
    try {
      classCode = localStorage.getItem('tizia.classCode') || undefined;
    } catch {}
    fetch('/api/attempts', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: 'lop2-ghep-van',
        score: finalScore * 10,
        correct: finalScore,
        total: N_ROUNDS,
        duration_ms: Date.now() - startTimeRef.current,
        details: { rounds: playedRounds.map((r) => r.word) },
        classCode,
      }),
    })
      .then((res) => {
        if (res.status === 401) setToast('🧸 Khách dùng thử — tiến độ không được lưu. Đăng nhập để giữ điểm.');
      })
      .catch(() => {});
  }, []);

  const finish = useCallback(
    (finalScore: number, playedRounds: Round[]) => {
      setFinished(true);
      submitAttempt(finalScore, playedRounds);
    },
    [submitAttempt],
  );

  const onSelect = useCallback(
    (kind: 'onset' | 'rhyme' | 'tone', v: string) => {
      if (consumed) return;
      if (kind === 'onset') setSelOnset((cur) => (cur === v ? null : v));
      else if (kind === 'rhyme') setSelRhyme((cur) => (cur === v ? null : v));
      else setSelTone((cur) => (cur === v ? null : v));
    },
    [consumed],
  );

  const clearSel = useCallback(() => {
    if (consumed) return;
    setSelOnset(null);
    setSelRhyme(null);
    setSelTone(null);
  }, [consumed]);

  const check = useCallback(() => {
    const r = roundsRef.current[idxRef.current];
    if (!r || !selOnset || !selRhyme || !selTone) return;
    const ok = selOnset === r.onset && selRhyme === r.rhyme && selTone === r.tone;
    const detail = `<b>${r.onset}</b> + <b>${r.rhyme}</b> + dấu <b>${toneLabel(r.tone)}</b> = <b>${r.word}</b>`;
    let nextScore = scoreRef.current;
    if (ok) {
      nextScore = scoreRef.current + 1;
      setScore(nextScore);
      scoreRef.current = nextScore;
      setFeedback({ kind: 'ok', html: `✓ Giỏi quá! ${detail}` });
    } else {
      setFeedback({ kind: 'bad', html: `Chưa đúng. Đáp án: ${detail}` });
    }
    setConsumed(true);
    timerRef.current = setTimeout(
      () => {
        const next = idxRef.current + 1;
        if (next >= N_ROUNDS) {
          finish(nextScore, roundsRef.current);
        } else {
          setIdx(next);
          idxRef.current = next;
          startRoundAt(next, roundsRef.current);
        }
      },
      ok ? 900 : 1900,
    );
  }, [selOnset, selRhyme, selTone, finish, startRoundAt]);

  const playAgain = useCallback(() => {
    if (allRounds.length > 0) beginGame(allRounds);
  }, [allRounds, beginGame]);

  // Toast tự ẩn.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const canCheck = !!(selOnset && selRhyme && selTone) && !consumed;
  const cur = rounds[idx];
  const barPct = finished ? 100 : (idx / N_ROUNDS) * 100;

  // Nội dung finish.
  let finishMsg = 'Em đã ghép vần rất giỏi!';
  let finishBadge = '';
  if (score === N_ROUNDS) {
    finishMsg = 'Tuyệt vời! Em ghép đúng tất cả!';
    finishBadge = '🏆 Bậc thầy ghép vần';
  } else if (score >= 8) {
    finishMsg = 'Em làm rất tốt! Cố thêm chút nữa nhé!';
    finishBadge = '⭐ Thợ ghép vần giỏi';
  } else if (score >= 5) {
    finishMsg = 'Khá tốt rồi! Luyện thêm sẽ giỏi nữa.';
    finishBadge = '🌱 Đang tiến bộ';
  } else {
    finishMsg = 'Đừng nản, ghép thêm vài lần nữa em sẽ giỏi!';
  }

  return (
    <div className="lgv-root">
      <div className="top">
        <a className="back" href={backHref}>
          ← Trường Tiểu học
        </a>
        <div>
          <h1>
            🔤 Ghép vần <span className="sub">— Tiếng Việt · Lớp 2</span>
          </h1>
        </div>
        <div className="right">
          <div className="stat">
            Cờ <span className="v">{Math.min(idx + 1, N_ROUNDS)}</span>/<span>{N_ROUNDS}</span>
          </div>
          <div className="stat">
            Điểm <span className="v">{score}</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        {loading ? (
          <div className="card" style={{ textAlign: 'center' }}>
            Đang tải bộ vần…
          </div>
        ) : allRounds.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            Chưa có bộ vần. Vui lòng thử lại sau.
          </div>
        ) : !finished ? (
          <div className="card">
            <div className="prompt">
              <p className="hint">Ghép thành tiếng:</p>
              <div className="target">{cur?.word ?? '—'}</div>
              <div className="meaning">{cur ? '(' + cur.meaning + ')' : ''}</div>
            </div>

            <div className="built">
              {selOnset || selRhyme || selTone ? (
                <>
                  <span style={{ color: '#f97316' }}>{selOnset || '_'}</span>{' '}
                  <span style={{ opacity: 0.4 }}>+</span>{' '}
                  <span style={{ color: '#f97316' }}>{selRhyme || '_'}</span>{' '}
                  <span style={{ opacity: 0.4 }}>+</span>{' '}
                  <span style={{ color: '#f97316' }}>{selTone ? toneSymOf(selTone) : '_'}</span>
                </>
              ) : (
                <span className="placeholder">bấm 1 âm đầu + 1 vần + 1 dấu thanh…</span>
              )}
            </div>

            <div className="pool">
              <h3>🔠 Âm đầu</h3>
              <div className="tiles">
                {pools?.onsets.map((o, i) => (
                  <button
                    key={`o-${i}-${o}`}
                    className={'tile' + (selOnset === o ? ' selected' : '') + (consumed ? ' consumed' : '')}
                    onClick={() => onSelect('onset', o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="pool">
              <h3>🎵 Vần</h3>
              <div className="tiles">
                {pools?.rhymes.map((o, i) => (
                  <button
                    key={`r-${i}-${o}`}
                    className={'tile' + (selRhyme === o ? ' selected' : '') + (consumed ? ' consumed' : '')}
                    onClick={() => onSelect('rhyme', o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="pool">
              <h3>🎶 Dấu thanh</h3>
              <div className="tiles">
                {pools?.tones.map((id, i) => {
                  const t = TONES.find((x) => x.id === id)!;
                  return (
                    <button
                      key={`t-${i}-${id}`}
                      className={'tile' + (selTone === id ? ' selected' : '') + (consumed ? ' consumed' : '')}
                      title={t.label}
                      onClick={() => onSelect('tone', id)}
                    >
                      {t.sym}{' '}
                      <span style={{ opacity: 0.55, fontSize: '13px', fontWeight: 600 }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="progress-bar">
              <div className="fill" style={{ width: barPct + '%' }} />
            </div>

            <div className={'feedback' + (feedback ? ' show ' + feedback.kind : '')}>
              {feedback && <span dangerouslySetInnerHTML={{ __html: feedback.html }} />}
            </div>

            <div className="row">
              <button className="btn ghost" onClick={clearSel}>
                ↺ Xoá
              </button>
              <button className="btn act" disabled={!canCheck} onClick={check}>
                ✓ Kiểm tra
              </button>
            </div>
          </div>
        ) : (
          <div className="card finish">
            <h2>🎉 Hoàn thành!</h2>
            <div className="score-big">
              {score}/{N_ROUNDS}
            </div>
            <p>{finishMsg}</p>
            <div className="row">
              <button className="btn ghost" onClick={playAgain}>
                🔄 Chơi lại
              </button>
              <a className="btn act" href="/space?domain=primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                ← Về trường
              </a>
            </div>
            {finishBadge && (
              <div>
                <div className="badge">{finishBadge}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>

      <style jsx>{`
        .lgv-root {
          --bg-1: #fff7ed;
          --accent: #f97316;
          --ok: #22c55e;
          --bad: #ef4444;
          --card: #ffffff;
          --border: rgba(0, 0, 0, 0.08);
          --ink: #1f2937;
          --muted: #6b7280;
          position: fixed;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          color: var(--ink);
          font-family: 'Inter', 'Quicksand', system-ui, sans-serif;
          background: radial-gradient(ellipse 90% 50% at 50% 0%, #fde68a, transparent),
            linear-gradient(180deg, var(--bg-1), #ffe4c4);
          z-index: 40;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.7);
          position: sticky;
          top: 0;
          z-index: 5;
          backdrop-filter: blur(8px);
        }
        .back {
          color: var(--ink);
          text-decoration: none;
          opacity: 0.85;
          font-size: 14px;
          background: rgba(0, 0, 0, 0.06);
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 600;
        }
        .back:hover {
          background: rgba(0, 0, 0, 0.12);
        }
        .top h1 {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
        }
        .top .sub {
          font-size: 12.5px;
          opacity: 0.6;
          font-weight: 500;
        }
        .top .right {
          margin-left: auto;
          display: flex;
          gap: 10px;
          align-items: center;
          font-size: 13.5px;
        }
        .stat {
          background: white;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 7px 13px;
          font-weight: 700;
        }
        .stat .v {
          color: var(--accent);
          font-size: 16px;
        }
        .wrap {
          max-width: 780px;
          margin: 0 auto;
          padding: 24px 18px 60px;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 22px 22px 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }
        .prompt {
          text-align: center;
          margin-bottom: 18px;
        }
        .prompt .hint {
          font-size: 13.5px;
          opacity: 0.65;
          margin: 0 0 10px;
        }
        .prompt .target {
          font-size: 46px;
          font-weight: 900;
          color: var(--accent);
          letter-spacing: 1px;
        }
        .prompt .meaning {
          font-size: 13.5px;
          opacity: 0.75;
          margin-top: 4px;
          font-style: italic;
        }
        .built {
          text-align: center;
          padding: 10px 12px;
          background: #fef3c7;
          border: 1.5px dashed #fbbf24;
          border-radius: 12px;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 2px;
          min-height: 52px;
          margin-bottom: 18px;
          color: #92400e;
        }
        .built .placeholder {
          color: #d1d5db;
          font-style: italic;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: 0;
        }
        .pool {
          margin-bottom: 14px;
        }
        .pool h3 {
          font-size: 12.5px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--muted);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .tiles {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tile {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 11px;
          padding: 11px 18px;
          font-size: 20px;
          font-weight: 800;
          color: #374151;
          cursor: pointer;
          transition: 0.15s;
          user-select: none;
          min-width: 54px;
          text-align: center;
          font-family: inherit;
        }
        .tile:hover {
          transform: translateY(-2px);
          border-color: #fbbf24;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }
        .tile.selected {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
          transform: scale(1.05);
        }
        .tile.consumed {
          opacity: 0.3;
          pointer-events: none;
        }
        .row {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          border: none;
          border-radius: 11px;
          font-weight: 800;
          font-size: 14px;
          padding: 11px 22px;
          cursor: pointer;
          font-family: inherit;
        }
        .btn.act {
          background: var(--accent);
          color: white;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.35);
        }
        .btn.act:hover {
          filter: brightness(1.06);
        }
        .btn.act:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn.ghost {
          background: white;
          color: var(--ink);
          border: 1px solid var(--border);
        }
        .btn.ghost:hover {
          background: #f9fafb;
        }
        .feedback {
          margin-top: 14px;
          padding: 11px 14px;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          opacity: 0;
          transform: translateY(6px);
          transition: 0.2s;
        }
        .feedback.show {
          opacity: 1;
          transform: translateY(0);
        }
        .feedback.ok {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #86efac;
        }
        .feedback.bad {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }
        .progress-bar {
          height: 8px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          overflow: hidden;
          margin: 18px 0 8px;
        }
        .progress-bar .fill {
          height: 100%;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          transition: 0.3s;
        }
        .finish {
          text-align: center;
          padding: 40px 20px;
        }
        .finish h2 {
          font-size: 32px;
          margin: 0 0 12px;
          color: var(--accent);
        }
        .finish .score-big {
          font-size: 60px;
          font-weight: 900;
          color: var(--ok);
          margin: 14px 0;
        }
        .finish p {
          font-size: 15px;
          opacity: 0.75;
        }
        .finish .badge {
          display: inline-block;
          background: #fef3c7;
          border: 2px solid #fbbf24;
          padding: 11px 18px;
          border-radius: 30px;
          font-weight: 700;
          color: #92400e;
          margin-top: 8px;
        }
        .toast {
          position: fixed;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%) translateY(20px);
          background: var(--ok);
          color: white;
          font-weight: 800;
          padding: 13px 24px;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          opacity: 0;
          transition: 0.3s;
          z-index: 20;
          max-width: 90vw;
          text-align: center;
        }
        .toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        @media (max-width: 520px) {
          .prompt .target {
            font-size: 36px;
          }
          .built {
            font-size: 22px;
          }
          .tile {
            font-size: 18px;
            padding: 9px 14px;
          }
        }
      `}</style>
    </div>
  );
}
