'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Boss catalog — chia theo môn (subjectId rỗng = random). Giữ nguyên từ tran-dau.html.
type Boss = {
  emo: string;
  name: string;
  subj: string;
  hp: number;
  difficulty: string;
  rewardCoin: number;
  rewardXp: number;
  subjectId: string;
};

const BOSSES: Boss[] = [
  { emo: '🧮', name: 'Hắc Toán Sư', subj: 'Toán học', hp: 5, difficulty: 'Dễ', rewardCoin: 50, rewardXp: 80, subjectId: '' },
  { emo: '🐉', name: 'Long Văn Đế', subj: 'Ngữ Văn', hp: 5, difficulty: 'Dễ', rewardCoin: 50, rewardXp: 80, subjectId: '' },
  { emo: '🦇', name: 'Vampire Anh', subj: 'Tiếng Anh', hp: 6, difficulty: 'TB', rewardCoin: 60, rewardXp: 100, subjectId: '' },
  { emo: '🔮', name: 'Phù thủy Khoa học', subj: 'KHTN', hp: 6, difficulty: 'TB', rewardCoin: 60, rewardXp: 100, subjectId: '' },
  { emo: '👹', name: 'Quỷ Sử Địa', subj: 'Sử – Địa', hp: 7, difficulty: 'Khó', rewardCoin: 80, rewardXp: 140, subjectId: '' },
  { emo: '🤖', name: 'AI Tin học', subj: 'Tin học', hp: 7, difficulty: 'Khó', rewardCoin: 80, rewardXp: 140, subjectId: '' },
  { emo: '👻', name: 'Hồn ma Lập trình', subj: 'Lập trình', hp: 8, difficulty: 'Cao thủ', rewardCoin: 120, rewardXp: 200, subjectId: '' },
  { emo: '🐲', name: 'Tổ phụ Knowledge', subj: 'Tổng hợp', hp: 10, difficulty: 'Boss cuối', rewardCoin: 200, rewardXp: 300, subjectId: '' },
];

// ---- Kiểu dữ liệu câu hỏi (shape từ /api/quiz/adaptive-next) ----
type Answer = { id?: string | number; value?: string | number; text?: string; label?: string };
type Question = {
  id: string | number;
  question?: string;
  body?: string;
  answers?: Answer[];
  options?: Answer[];
};

type Phase = 'fight' | 'error' | 'flee' | 'win' | 'lose';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function BossArena() {
  const [combat, setCombat] = useState<Boss | null>(null);

  return (
    <>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 px-4">
        {BOSSES.map((b, i) => (
          <button
            key={i}
            onClick={() => setCombat(b)}
            className="group cursor-pointer rounded-[18px] border border-border bg-card p-[18px] text-center transition-all duration-150 hover:-translate-y-[3px] hover:border-[#fb7185] hover:shadow-[0_12px_30px_rgba(239,68,68,.18)]"
          >
            <span
              className="mb-2 block text-[64px] leading-none tz-boss-float"
              style={{ filter: 'drop-shadow(0 8px 14px rgba(239,68,68,.4))' }}
            >
              {b.emo}
            </span>
            <div className="mb-2 inline-block rounded-full bg-[rgba(239,68,68,.10)] px-2.5 py-[3px] text-[11px] font-bold text-[#fca5a5]">
              {b.difficulty}
            </div>
            <div className="mb-1 text-[17px] font-extrabold text-foreground">{b.name}</div>
            <div className="mb-2.5 text-xs text-muted-foreground">Chủ đề: {b.subj}</div>
            <div className="flex justify-around border-t border-border pt-2.5 text-xs text-muted-foreground">
              <div>
                HP: <b className="text-[14px] text-[#fbbf24]">{b.hp}</b>
              </div>
              <div>+{b.rewardCoin}🪙</div>
              <div>+{b.rewardXp}✨</div>
            </div>
          </button>
        ))}
      </div>

      {combat && <CombatOverlay boss={combat} onClose={() => setCombat(null)} />}

      <style>{`
        @keyframes tz-boss-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .tz-boss-float { animation: tz-boss-float 3s ease-in-out infinite; }
        @keyframes tz-cb-bobble { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes tz-cb-hit {
          0%{transform:translateX(0);filter:brightness(1)}
          20%{transform:translateX(-12px);filter:brightness(2) hue-rotate(-30deg)}
          50%{transform:translateX(12px);filter:brightness(1.5)}
          100%{transform:translateX(0);filter:brightness(1)}
        }
        .tz-cb-emo { animation: tz-cb-bobble 2.4s ease-in-out infinite; }
        .tz-cb-emo.hit { animation: tz-cb-hit 0.4s; }
      `}</style>
    </>
  );
}

// ---- Overlay chiến đấu — port từ public/js/combat-by-quiz.js, giữ nguyên hành vi ----
function CombatOverlay({ boss, onClose }: { boss: Boss; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>('fight');
  const [loseMsg, setLoseMsg] = useState<string>('Em đã thua trận này');
  const [bossHp, setBossHp] = useState(boss.hp);
  const [hearts, setHearts] = useState(5);
  const [qNo, setQNo] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctVals, setCorrectVals] = useState<Set<string>>(new Set());
  const [wrongVal, setWrongVal] = useState<string | null>(null);
  const [hit, setHit] = useState(false);
  const [loading, setLoading] = useState(true);

  const bossHpMax = boss.hp;
  const qMax = boss.hp + 3; // tối đa số câu = HP + 3 (margin)
  const excludeIds = useRef<(string | number)[]>([]);

  const loadHearts = useCallback(async () => {
    try {
      const r = await fetch('/api/engagement/state', { credentials: 'same-origin' });
      if (r.ok) {
        const d = await r.json();
        if (typeof d.hearts === 'number') setHearts(d.hearts);
      }
    } catch {}
  }, []);

  const loadQuestion = useCallback(async () => {
    setSelected(null);
    setAnswered(false);
    setCorrectVals(new Set());
    setWrongVal(null);
    try {
      const r = await fetch('/api/quiz/adaptive-next', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id: boss.subjectId, exclude_ids: excludeIds.current }),
        credentials: 'same-origin',
      });
      if (!r.ok) {
        setQuestion(null);
        return;
      }
      const d = await r.json();
      setQuestion(d.question ?? null);
    } catch {
      setQuestion(null);
    }
  }, [boss.subjectId]);

  // Khởi động trận: load hearts + câu đầu.
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      await loadHearts();
      await loadQuestion();
      if (alive) setLoading(false);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const win = useCallback(async () => {
    // Reward — gọi /api/engagement/track (best-effort).
    try {
      await fetch('/api/engagement/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'minigame', amount: 1 }),
        credentials: 'same-origin',
      });
    } catch {}
    setPhase('win');
    // Refresh HUD + pet (nếu widget legacy có mặt).
    try {
      (window as unknown as { __tziaEngagementHud?: { refresh?: () => void } }).__tziaEngagementHud?.refresh?.();
    } catch {}
    try {
      (window as unknown as { __tziaPetWidget?: { refresh?: () => void } }).__tziaPetWidget?.refresh?.();
    } catch {}
  }, []);

  const attack = useCallback(async () => {
    if (!question || selected == null || answered) return;
    setAnswered(true);
    try {
      const r = await fetch('/api/quiz/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question_id: question.id, answer: selected }),
        credentials: 'same-origin',
      });
      const d = await r.json();
      const correct = !!d.correct;

      // Highlight đúng/sai
      const cvs = new Set<string>((d.correct_answers || []).map((x: unknown) => String(x)));
      setCorrectVals(cvs);
      if (!correct) setWrongVal(String(selected));

      excludeIds.current.push(question.id);
      const nextQNo = qNo + 1;
      setQNo(nextQNo);

      let nextBossHp = bossHp;
      let nextHearts = hearts;
      if (correct) {
        nextBossHp = Math.max(0, bossHp - 1);
        setBossHp(nextBossHp);
        setHit(true);
        setTimeout(() => setHit(false), 400);
      } else {
        nextHearts = Math.max(0, hearts - 1);
        setHearts(nextHearts);
        // Spend server heart background (best-effort)
        fetch('/api/engagement/spend-heart', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
      }

      await sleep(900);
      if (nextBossHp <= 0) return win();
      if (nextHearts <= 0) {
        setPhase('lose');
        setLoseMsg('Em đã thua trận này');
        return;
      }
      if (nextQNo >= qMax) {
        setPhase('lose');
        setLoseMsg('Hết lượt — boss chạy mất rồi!');
        return;
      }

      // Câu kế tiếp
      await loadQuestion();
    } catch (e) {
      console.warn('[combat] attack', e);
    }
  }, [question, selected, answered, qNo, bossHp, hearts, qMax, loadQuestion, win]);

  const hpPct = Math.round((bossHp / bossHpMax) * 100);
  const answers = question ? question.answers || question.options || [] : [];

  return (
    <div
      className="fixed inset-0 z-[700] flex flex-col items-center justify-center p-4 text-white"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(15,23,42,0.85) 0%, rgba(2,6,23,0.96) 100%)',
        backdropFilter: 'blur(14px)',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        className="w-[min(720px,100%)] rounded-[22px] p-6"
        style={{
          background: 'linear-gradient(180deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)',
          border: '2px solid rgba(251,191,36,0.5)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(251,191,36,0.25)',
        }}
      >
        {phase === 'flee' && (
          <Result big="🏃" title="Em đã rút lui" desc="Quay lại sau khi luyện tập thêm nhé." button="Đóng" onClick={onClose} />
        )}

        {phase === 'win' && (
          <Result
            big="🏆"
            title={`Em đã hạ ${boss.name}!`}
            drop={`+${boss.rewardCoin} 🪙 · +${boss.rewardXp} ✨ · drop skin ngẫu nhiên`}
            desc="Trận chiến đã được ghi vào nhật ký học tập."
            button="Tuyệt vời! ✨"
            onClick={onClose}
          />
        )}

        {phase === 'lose' && (
          <Result big="💀" title={loseMsg} desc="Đừng nản — ôn lại bài rồi quay lại boss này nhé." button="Thử lại sau" onClick={onClose} />
        )}

        {phase === 'fight' && loading && (
          <p className="py-8 text-center text-[#cbd5e1]">Đang tải trận đấu…</p>
        )}

        {phase === 'fight' && !loading && !question && (
          <p className="text-center text-[#cbd5e1]">
            Không tải được câu hỏi.
            <button
              onClick={onClose}
              className="ml-2 cursor-pointer rounded-lg border-none bg-[#fbbf24] px-3.5 py-1.5 text-[#1e293b]"
            >
              Đóng
            </button>
          </p>
        )}

        {phase === 'fight' && !loading && question && (
          <>
            <div className="mb-5 text-center">
              <div
                className={`inline-block text-[88px] leading-none tz-cb-emo${hit ? ' hit' : ''}`}
                style={{ filter: 'drop-shadow(0 8px 24px rgba(239,68,68,0.5))' }}
              >
                {boss.emo}
              </div>
              <div
                className="mt-1.5 text-[22px] font-extrabold"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24, #ef4444)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {boss.name}
              </div>
              <div
                className="mt-2.5 h-[14px] overflow-hidden rounded-lg border border-white/15"
                style={{ background: 'rgba(0,0,0,0.4)' }}
              >
                <i
                  className="block h-full transition-[width] duration-[450ms]"
                  style={{ width: `${hpPct}%`, background: 'linear-gradient(90deg, #ef4444, #fbbf24)' }}
                />
              </div>
              <div className="mt-1 text-xs font-bold text-[#fca5a5]">
                ❤ HP {bossHp}/{bossHpMax}
              </div>
            </div>

            <div className="mt-5 rounded-[14px] border border-white/[.08] bg-white/[.03] p-[18px]">
              <div className="mb-3.5 text-base font-semibold leading-[1.55]">
                {question.question || question.body || '?'}
              </div>
              {answers.map((a, i) => {
                const val = String(a.id ?? a.value ?? i);
                const isCorrect = correctVals.has(val);
                const isWrong = val === wrongVal;
                const isSelected = selected === val && !answered;
                return (
                  <label
                    key={i}
                    onClick={() => {
                      if (answered) return;
                      setSelected(val);
                    }}
                    className="my-1.5 block cursor-pointer rounded-[10px] border px-3.5 py-[11px] text-sm transition-all duration-100"
                    style={{
                      background: isCorrect
                        ? 'rgba(34,197,94,0.20)'
                        : isWrong
                          ? 'rgba(239,68,68,0.15)'
                          : isSelected
                            ? 'rgba(251,191,36,0.18)'
                            : 'rgba(255,255,255,0.05)',
                      borderColor: isCorrect
                        ? '#22c55e'
                        : isWrong
                          ? '#ef4444'
                          : 'rgba(255,255,255,0.10)',
                    }}
                  >
                    <input
                      type="radio"
                      name="cb-ans"
                      value={val}
                      checked={selected === val}
                      readOnly
                      className="mr-2"
                    />
                    {a.text || a.label || String(a)}
                  </label>
                );
              })}
            </div>

            <div className="mt-3.5 flex items-center justify-between text-[13px] text-[#cbd5e1]">
              <span className="font-bold text-[#ef4444]">❤ {hearts}</span>
              <span className="font-bold text-[#fbbf24]">
                Câu {qNo + 1}/{qMax}
              </span>
            </div>

            <div className="mt-3.5 flex gap-2.5">
              <button
                onClick={attack}
                disabled={selected == null || answered}
                className="flex-1 cursor-pointer rounded-[12px] border-none px-4 py-[11px] text-sm font-extrabold text-[#1e293b] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #fbbf24)',
                  boxShadow: '0 8px 24px rgba(239,68,68,0.35)',
                }}
              >
                ⚔ Tấn công
              </button>
              <button
                onClick={() => setPhase('flee')}
                className="flex-1 cursor-pointer rounded-[12px] border-none bg-white/[.08] px-4 py-[11px] text-sm font-extrabold text-[#cbd5e1]"
              >
                🏃 Chạy trốn
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Result({
  big,
  title,
  drop,
  desc,
  button,
  onClick,
}: {
  big: string;
  title: string;
  drop?: string;
  desc: string;
  button: string;
  onClick: () => void;
}) {
  return (
    <div className="px-5 py-[30px] text-center">
      <div className="text-[64px]">{big}</div>
      <h2
        className="my-1.5 mt-2.5 text-[28px] font-extrabold"
        style={{
          background: 'linear-gradient(135deg, #fbbf24, #ec4899)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {title}
      </h2>
      {drop && (
        <div
          className="my-3 inline-block rounded-full px-[18px] py-2 font-bold text-[#fde68a]"
          style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)' }}
        >
          {drop}
        </div>
      )}
      <p className="text-[#cbd5e1]">{desc}</p>
      <button
        onClick={onClick}
        className="mt-2 cursor-pointer rounded-[14px] border-none px-7 py-3 text-sm font-extrabold text-[#1e293b]"
        style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)' }}
      >
        {button}
      </button>
    </div>
  );
}
