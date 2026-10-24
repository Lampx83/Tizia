'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ============================================================
// Bản đồ Việt Nam Tri Thức — 34 tỉnh/thành (sau sáp nhập 1/7/2025).
// Mỗi tỉnh: thông tin + 2 quiz. localStorage: bandovn.solved.<id>
// ============================================================

export type QuizItem = { q: string; choices: string[]; answer: number };
export type Province = {
  id: string;
  name: string;
  region: string;
  emoji: string;
  capital: string;
  area_km2: number;
  highlight: string;
  quiz: QuizItem[];
};

// ── Grouping ─────────────────────────────────────────────────
const REGIONS = [
  { key: 'Trung du và miền núi phía Bắc', icon: '🏔️', desc: '9 tỉnh vùng núi & trung du phía Bắc' },
  { key: 'Đồng bằng sông Hồng', icon: '🏯', desc: '6 tỉnh, thành quanh châu thổ sông Hồng' },
  { key: 'Bắc Trung Bộ và Duyên hải miền Trung', icon: '🌊', desc: '9 tỉnh, thành dải đất miền Trung & biển đảo' },
  { key: 'Tây Nguyên', icon: '☕', desc: 'Cao nguyên đất đỏ, cà phê và voi' },
  { key: 'Đông Nam Bộ', icon: '🌆', desc: 'Trung tâm kinh tế năng động phía Nam' },
  { key: 'Đồng bằng sông Cửu Long', icon: '🛥️', desc: 'Vựa lúa, miệt vườn miền Tây' },
];

// ── State keys ───────────────────────────────────────────────
const SOLVED_KEY = (id: string) => 'bandovn.solved.' + id;
const XP_KEY = 'bandovn.xp';

function readSolved(id: string): boolean {
  try {
    return localStorage.getItem(SOLVED_KEY(id)) === '1';
  } catch {
    return false;
  }
}
function writeSolved(id: string) {
  try {
    localStorage.setItem(SOLVED_KEY(id), '1');
  } catch {}
}
function readXP(): number {
  try {
    return parseInt(localStorage.getItem(XP_KEY) || '0', 10) || 0;
  } catch {
    return 0;
  }
}
function writeXP(n: number) {
  try {
    localStorage.setItem(XP_KEY, String(n));
  } catch {}
}

export default function MapClient({ provinces }: { provinces: Province[] }) {
  const PROVINCES = provinces;

  // Trạng thái chinh phục + XP đọc từ localStorage (client-only để tránh mismatch SSR).
  const [solvedSet, setSolvedSet] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState(0);
  const [active, setActive] = useState<Province | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nạp trạng thái đã lưu sau khi mount.
  useEffect(() => {
    const s: Record<string, boolean> = {};
    for (const p of PROVINCES) if (readSolved(p.id)) s[p.id] = true;
    setSolvedSet(s);
    setXp(readXP());
    // Sanity check log: kỳ vọng 34 tỉnh/thành (sau sáp nhập 2025)
    console.log(`[ban-do-vn] Loaded ${PROVINCES.length} provinces`);
  }, [PROVINCES]);

  const total = PROVINCES.length;
  const solvedCount = useMemo(
    () => PROVINCES.filter((p) => solvedSet[p.id]).length,
    [PROVINCES, solvedSet],
  );

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2400);
  }, []);

  const openModal = useCallback(
    (id: string) => {
      const p = PROVINCES.find((x) => x.id === id);
      if (p) setActive(p);
    },
    [PROVINCES],
  );
  const closeModal = useCallback(() => setActive(null), []);

  // Đóng modal bằng Escape.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, closeModal]);

  // Khi trả lời đúng cả 2 câu của 1 tỉnh.
  const onSolved = useCallback(
    (p: Province) => {
      const wasSolved = readSolved(p.id);
      writeSolved(p.id);
      setSolvedSet((prev) => ({ ...prev, [p.id]: true }));
      if (!wasSolved) {
        const next = readXP() + 10;
        writeXP(next);
        setXp(next);
        toast(`🎉 +10 XP! Chinh phục ${p.name}!`);
      } else {
        toast(`✓ Trả lời đúng cả 2 câu — ${p.name}!`);
      }
    },
    [toast],
  );

  const fillPct = total ? (solvedCount / total) * 100 : 0;

  return (
    <>
      <style>{css}</style>

      <div className="bdv-top">
        <a className="bdv-back" href="/">
          ← Tizia
        </a>
        <div className="bdv-title">
          <span className="bdv-star">★</span> Bản đồ Việt Nam Tri Thức
        </div>
        <div className="bdv-stats">
          <span className="bdv-pill">
            🏆 Đã chinh phục: <b>{solvedCount}</b>/<span>{total}</span>
          </span>
          <span className="bdv-pill">
            ✨ XP: <b>{xp.toLocaleString('vi-VN')}</b>
          </span>
        </div>
      </div>

      <div className="bdv-hero">
        <h1>🗺️ 34 Tỉnh Thành — 34 Câu Chuyện</h1>
        <p>
          Việt Nam sau sáp nhập (1/7/2025) có 34 tỉnh, thành phố. Bấm vào tỉnh em yêu thích, trả lời
          2 câu hỏi vui để cắm cờ chinh phục!
        </p>
        <div className="bdv-flag-stripe">
          <div className="s" />
          <div className="s" />
          <div className="s" />
        </div>
      </div>

      <main className="bdv-map">
        {REGIONS.map((reg) => {
          const list = PROVINCES.filter((p) => p.region === reg.key);
          return (
            <section className="bdv-region" key={reg.key}>
              <div className="bdv-region-head">
                <h2>
                  {reg.icon} {reg.key}
                </h2>
                <span className="count">{list.length} tỉnh</span>
                <div className="line" />
              </div>
              <div className="bdv-grid">
                {list.map((p) => (
                  <button
                    key={p.id}
                    className={'bdv-card' + (solvedSet[p.id] ? ' solved' : '')}
                    title={p.name}
                    onClick={() => openModal(p.id)}
                  >
                    <div className="emo">{p.emoji}</div>
                    <div className="pname">{p.name}</div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="bdv-footer">
        <div className="bdv-progress-pill">
          <span>🇻🇳</span>
          <span className="pcount">
            <span>{solvedCount}</span>/<span>{total}</span>
          </span>
          <div className="ptrack">
            <div className="pfill" style={{ width: fillPct + '%' }} />
          </div>
          <span className="plabel">tỉnh đã chinh phục</span>
        </div>
      </footer>

      {active && (
        <ProvinceModal
          key={active.id}
          province={active}
          alreadySolved={!!solvedSet[active.id]}
          onClose={closeModal}
          onSolved={onSolved}
          onWrong={() => toast(`💪 Chưa đúng hết — thử lại nhé!`)}
        />
      )}

      <div className={'bdv-toast' + (toastShow ? ' show' : '')}>{toastMsg}</div>
    </>
  );
}

// ── Modal ────────────────────────────────────────────────────
function ProvinceModal({
  province: p,
  alreadySolved,
  onClose,
  onSolved,
  onWrong,
}: {
  province: Province;
  alreadySolved: boolean;
  onClose: () => void;
  onSolved: (p: Province) => void;
  onWrong: () => void;
}) {
  // Mỗi câu: null (chưa trả lời) | { picked, correct }.
  const [answers, setAnswers] = useState<Array<{ picked: number; correct: boolean } | null>>(() =>
    p.quiz.map(() => null),
  );

  const onAnswer = (qi: number, ci: number) => {
    if (answers[qi]) return; // block đã trả lời
    const correct = ci === p.quiz[qi].answer;
    const next = answers.slice();
    next[qi] = { picked: ci, correct };
    setAnswers(next);

    // Cả 2 câu đã trả lời?
    const allDone = next.every((a) => a !== null);
    if (allDone) {
      const allCorrect = next.every((a) => a!.correct);
      if (allCorrect) onSolved(p);
      else onWrong();
    }
  };

  return (
    <div
      className="bdv-modal-bg show"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bdv-modal">
        <button className="close" aria-label="Đóng" onClick={onClose}>
          ✕
        </button>
        <div className="modal-head">
          <div className="em">{p.emoji}</div>
          <div>
            <h3>{p.name}</h3>
            <div className="reg">
              {p.region}
              {alreadySolved ? ' · ✓ Đã chinh phục' : ''}
            </div>
          </div>
        </div>
        <div className="info-row">
          <span className="k">🏛️ Tỉnh lỵ:</span>
          <span className="v">{p.capital}</span>
          <span className="k">📏 Diện tích:</span>
          <span className="v">≈ {p.area_km2.toLocaleString('vi-VN')} km²</span>
        </div>
        <div className="highlight-box">✨ {p.highlight}</div>

        {p.quiz.map((q, qi) => {
          const ans = answers[qi];
          return (
            <div className="quiz-block" key={qi}>
              <div className="qtitle">Câu {qi + 1}/2</div>
              <div className="qq">{q.q}</div>
              <div className="choices">
                {q.choices.map((c, ci) => {
                  let cls = 'choice';
                  if (ans) {
                    if (ci === q.answer) cls += ' correct';
                    else if (ci === ans.picked) cls += ' wrong';
                  }
                  return (
                    <button
                      key={ci}
                      className={cls}
                      disabled={!!ans}
                      onClick={() => onAnswer(qi, ci)}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="progress-bar">
          {p.quiz.map((_, i) => (
            <div key={i} className={'seg' + (answers[i]?.correct ? ' ok' : '')} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Styles (giữ nguyên thiết kế trang gốc — thương hiệu cờ đỏ sao vàng) ──
const css = `
.bdv-top,.bdv-hero,.bdv-map,.bdv-footer,.bdv-modal-bg,.bdv-toast { --red-1:#c8102e; --red-2:#8c0a1f; --red-3:#5a0614; --gold:#ffd54a; --gold-soft:#fff0a8; --ink:#1f2937; --ink-soft:#475569; --paper:#fff8e7; --ok:#16a34a; --bad:#dc2626; }
.bdv-top *,.bdv-hero *,.bdv-map *,.bdv-footer *,.bdv-modal-bg *,.bdv-toast * { box-sizing:border-box; }

.bdv-top { position:sticky; top:0; z-index:20; display:flex; align-items:center; gap:10px; flex-wrap:wrap; padding:14px 18px; margin:-1rem -1rem 0; background:linear-gradient(180deg, rgba(90,6,20,.92) 0%, rgba(90,6,20,.78) 70%, rgba(90,6,20,0) 100%); backdrop-filter:blur(8px); color:var(--ink); font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; }
.bdv-back { background:rgba(255,255,255,.95); color:var(--red-2); text-decoration:none; padding:8px 16px; border-radius:22px; font-size:13px; font-weight:700; box-shadow:0 4px 12px rgba(0,0,0,.25); }
.bdv-back:hover { background:var(--gold); }
.bdv-title { color:var(--gold); font-size:18px; font-weight:800; text-shadow:0 2px 8px rgba(0,0,0,.4); display:flex; align-items:center; gap:8px; }
.bdv-star { display:inline-block; color:var(--gold); }
.bdv-stats { margin-left:auto; display:flex; gap:8px; flex-wrap:wrap; }
.bdv-pill { background:rgba(255,255,255,.95); color:var(--red-2); padding:7px 14px; border-radius:18px; font-size:13px; font-weight:700; box-shadow:0 4px 12px rgba(0,0,0,.2); display:flex; align-items:center; gap:6px; }
.bdv-pill b { color:var(--red-1); font-weight:900; }

.bdv-hero { position:relative; z-index:1; text-align:center; padding:30px 18px 10px; color:#fff; font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; }
.bdv-hero h1 { margin:0 0 8px; font-size:34px; font-weight:900; letter-spacing:-.5px; text-shadow:0 4px 12px rgba(0,0,0,.45); background:linear-gradient(135deg, #fff 0%, var(--gold) 100%); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.bdv-hero p { margin:0; font-size:14.5px; opacity:.92; }
.bdv-flag-stripe { display:inline-flex; gap:6px; margin-top:14px; }
.bdv-flag-stripe .s { width:14px; height:14px; background:var(--gold); clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); filter:drop-shadow(0 2px 4px rgba(0,0,0,.4)); }

.bdv-map { position:relative; z-index:1; max-width:1200px; margin:0 auto; padding:18px 16px 100px; font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; color:var(--ink); }
.bdv-region { margin-bottom:30px; }
.bdv-region-head { display:flex; align-items:center; gap:10px; margin-bottom:14px; padding:0 6px; }
.bdv-region-head h2 { margin:0; color:var(--gold); font-size:18px; font-weight:800; text-shadow:0 2px 6px rgba(0,0,0,.4); }
.bdv-region-head .count { background:rgba(255,255,255,.15); color:#fff; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:700; }
.bdv-region-head .line { flex:1; height:1px; background:linear-gradient(90deg, rgba(255,213,74,.6), rgba(255,213,74,0)); }

.bdv-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(108px, 1fr)); gap:10px; }
@media (max-width:600px) { .bdv-grid { grid-template-columns:repeat(auto-fill, minmax(86px, 1fr)); gap:7px; } }

.bdv-card { position:relative; aspect-ratio:1/1; background:rgba(255,248,231,.97); border:2px solid rgba(255,213,74,.45); border-radius:14px; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; padding:6px; text-align:center; transition:transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s, border-color .2s; box-shadow:0 4px 10px rgba(0,0,0,.15); font-family:inherit; }
.bdv-card:hover { transform:translateY(-4px) scale(1.06); border-color:var(--gold); box-shadow:0 10px 22px rgba(255,213,74,.35); z-index:2; }
.bdv-card .emo { font-size:30px; line-height:1; filter:drop-shadow(0 2px 3px rgba(0,0,0,.18)); }
@media (max-width:600px) { .bdv-card .emo { font-size:24px; } }
.bdv-card .pname { font-size:11px; font-weight:700; color:var(--red-2); line-height:1.15; }
.bdv-card.solved { border-color:var(--ok); background:linear-gradient(180deg, #ecfdf5, #d1fae5); }
.bdv-card.solved::after { content:'✓'; position:absolute; top:4px; right:6px; width:18px; height:18px; background:var(--ok); color:#fff; border-radius:50%; font-size:12px; font-weight:900; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(0,0,0,.25); }

.bdv-modal-bg { position:fixed; inset:0; z-index:50; background:rgba(15,8,12,.75); backdrop-filter:blur(6px); display:none; align-items:center; justify-content:center; padding:18px; animation:bdvFadeIn .25s ease; font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; }
.bdv-modal-bg.show { display:flex; }
@keyframes bdvFadeIn { from { opacity:0; } to { opacity:1; } }
.bdv-modal { background:linear-gradient(180deg, var(--paper) 0%, #ffe9b8 100%); border-radius:22px; max-width:480px; width:100%; max-height:90vh; overflow-y:auto; padding:22px 22px 18px; position:relative; box-shadow:0 24px 60px rgba(0,0,0,.5); border:3px solid var(--gold); animation:bdvPopIn .35s cubic-bezier(.34,1.56,.64,1); color:var(--ink); }
@keyframes bdvPopIn { from { transform:scale(.85); opacity:0; } to { transform:scale(1); opacity:1; } }
.bdv-modal .close { position:absolute; top:10px; right:12px; width:32px; height:32px; border-radius:50%; border:none; background:var(--red-1); color:#fff; font-size:18px; font-weight:900; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,.25); }
.bdv-modal .close:hover { background:var(--red-2); }
.bdv-modal .modal-head { display:flex; align-items:center; gap:12px; padding-bottom:14px; border-bottom:2px dashed rgba(200,16,46,.3); margin-bottom:14px; }
.bdv-modal .modal-head .em { font-size:42px; }
.bdv-modal .modal-head h3 { margin:0; font-size:22px; color:var(--red-2); font-weight:900; }
.bdv-modal .modal-head .reg { font-size:12px; color:var(--ink-soft); font-weight:700; margin-top:2px; }
.bdv-modal .info-row { display:grid; grid-template-columns:auto 1fr; gap:6px 12px; font-size:13.5px; line-height:1.5; margin-bottom:12px; }
.bdv-modal .info-row .k { color:var(--red-1); font-weight:700; }
.bdv-modal .info-row .v { color:var(--ink); }
.bdv-modal .highlight-box { background:rgba(200,16,46,.08); border-left:3px solid var(--red-1); padding:9px 12px; border-radius:8px; font-size:13px; color:var(--ink); margin-bottom:16px; line-height:1.5; }
.bdv-modal .quiz-block { background:rgba(255,255,255,.7); border-radius:14px; padding:14px; margin-bottom:12px; }
.bdv-modal .quiz-block .qtitle { font-size:12px; font-weight:800; color:var(--red-2); margin-bottom:8px; text-transform:uppercase; letter-spacing:.5px; }
.bdv-modal .quiz-block .qq { font-size:14px; font-weight:700; color:var(--ink); margin-bottom:10px; line-height:1.4; }
.bdv-modal .choices { display:flex; flex-direction:column; gap:7px; }
.bdv-modal .choice { background:#fff; border:2px solid #e5e7eb; padding:9px 12px; border-radius:10px; cursor:pointer; font-size:13px; font-weight:600; color:var(--ink); text-align:left; font-family:inherit; transition:all .15s; }
.bdv-modal .choice:hover { border-color:var(--gold); background:var(--gold-soft); }
.bdv-modal .choice.correct { background:#dcfce7; border-color:var(--ok); color:#065f46; animation:bdvBounce .4s; }
.bdv-modal .choice.wrong { background:#fee2e2; border-color:var(--bad); color:#991b1b; animation:bdvShake .4s; }
.bdv-modal .choice:disabled { cursor:default; opacity:.7; }
.bdv-modal .choice.correct:disabled { opacity:1; }
@keyframes bdvBounce { 0%,100%{transform:scale(1);} 40%{transform:scale(1.05);} 70%{transform:scale(.98);} }
@keyframes bdvShake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-6px);} 75%{transform:translateX(6px);} }
.bdv-modal .progress-bar { display:flex; gap:4px; margin-top:6px; }
.bdv-modal .progress-bar .seg { flex:1; height:4px; background:rgba(0,0,0,.1); border-radius:2px; }
.bdv-modal .progress-bar .seg.ok { background:var(--ok); }

.bdv-toast { position:fixed; left:50%; top:20px; transform:translateX(-50%) translateY(-30px); z-index:60; background:var(--ok); color:#fff; padding:12px 22px; border-radius:14px; font-weight:800; font-size:14px; opacity:0; transition:opacity .25s, transform .25s; box-shadow:0 8px 24px rgba(22,163,74,.5); font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; }
.bdv-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

.bdv-footer { position:fixed; bottom:0; left:0; right:0; z-index:15; background:linear-gradient(0deg, rgba(90,6,20,.96) 0%, rgba(90,6,20,.85) 70%, rgba(90,6,20,0) 100%); padding:18px; text-align:center; backdrop-filter:blur(6px); font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; }
.bdv-progress-pill { display:inline-flex; align-items:center; gap:12px; background:rgba(255,255,255,.95); padding:10px 22px; border-radius:24px; box-shadow:0 6px 18px rgba(0,0,0,.3); }
.bdv-progress-pill .pcount { font-size:18px; font-weight:900; color:var(--red-1); }
.bdv-progress-pill .ptrack { width:140px; height:8px; background:#e5e7eb; border-radius:4px; overflow:hidden; }
.bdv-progress-pill .pfill { height:100%; background:linear-gradient(90deg, var(--ok), #22c55e); transition:width .4s; }
.bdv-progress-pill .plabel { font-size:13px; font-weight:700; color:var(--ink-soft); }

@media (max-width:600px) {
  .bdv-hero h1 { font-size:24px; }
  .bdv-title { font-size:15px; }
  .bdv-pill { font-size:12px; padding:6px 11px; }
  .bdv-modal { padding:18px 16px 14px; max-height:94vh; }
  .bdv-modal .modal-head h3 { font-size:18px; }
}
`;
