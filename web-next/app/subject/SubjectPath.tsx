'use client';

// ============================================================
// Lộ trình Toán 6 — chương → bài học (lesson path), mở khoá tuần tự.
// Dữ liệu chương SSR từ /api/content/math6-chapters (truyền qua props).
// Trạng thái sao (stars) đọc từ localStorage `tizia:progress` (client-only,
// guest cũng dùng được) — giống engine wallet.js của trang vanilla gốc.
// Giữ nguyên giao diện thương hiệu (gradient tím/hổ phách, node pulse) bằng
// CSS scoped để khớp bản gốc.
// ============================================================

import { useEffect, useMemo, useState } from 'react';

export type Lesson = {
  id: string;
  quizId: string;
  title: string;
  difficulty: number;
  boss: boolean;
  count: number;
};
export type Chapter = {
  id: string;
  title: string;
  icon: string;
  desc: string;
  lessons: Lesson[];
};

type LessonState = 'locked' | 'unlocked' | 'active' | 'completed';
type ProgressMap = Record<string, { stars?: number }>;

// Đọc progress từ localStorage — key + cross-user guard giống getProgress()
// trong js/engine/wallet.js. `_uid` là field nội bộ, loại khỏi map trả ra.
function readProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem('tizia:progress');
    if (!raw) return {};
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== 'object') return {};
    const meRaw = localStorage.getItem('tizia:me');
    const curUid = meRaw ? (JSON.parse(meRaw)?.id ?? null) : null;
    if (curUid != null && obj._uid != null && obj._uid !== curUid) {
      try { localStorage.removeItem('tizia:progress'); } catch {}
      return {};
    }
    const { _uid, ...stars } = obj as Record<string, unknown>;
    return stars as ProgressMap;
  } catch {
    return {};
  }
}

export default function SubjectPath({ chapters }: { chapters: Chapter[] }) {
  // Progress chỉ có ở client → render lần đầu (SSR) coi như rỗng, hydrate sau.
  const [progress, setProgress] = useState<ProgressMap>({});
  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const starsOf = (id: string) =>
    Math.max(0, Math.min(3, progress[id]?.stars || 0));
  const isDone = (id: string) => starsOf(id) >= 1;

  // back = URL hiện tại (giống location.pathname + search của trang gốc).
  const backUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return encodeURIComponent(window.location.pathname + window.location.search);
  }, []);

  // ── Tính trạng thái mở khoá tuần tự ── (bê nguyên logic renderMath6 gốc)
  const model = useMemo(() => {
    let prevChapterCleared = true; // chương 1 luôn mở
    let activeLessonId: string | null = null;

    const chaptersState = chapters.map((ch) => {
      const chapterUnlocked = prevChapterCleared;
      let prevLessonDone = true; // bài 1 mở nếu chương mở
      const lessons = ch.lessons.map((l) => {
        const done = isDone(l.id);
        const unlocked = chapterUnlocked && prevLessonDone;
        let state: LessonState = 'locked';
        if (done) state = 'completed';
        else if (unlocked) state = 'unlocked';
        if (unlocked && !done && !activeLessonId) {
          state = 'active';
          activeLessonId = l.id;
        }
        prevLessonDone = done;
        return { ...l, done, state };
      });
      // chương coi như "đã qua" nếu bài cuối (boss) hoàn thành
      prevChapterCleared = isDone(ch.lessons[ch.lessons.length - 1].id);
      const completedCount = lessons.filter((x) => x.done).length;
      return { ...ch, unlocked: chapterUnlocked, lessons, completedCount };
    });

    const totalLessons = chaptersState.reduce((s, c) => s + c.lessons.length, 0);
    const doneLessons = chaptersState.reduce((s, c) => s + c.completedCount, 0);
    const pct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;
    const activeLesson = activeLessonId
      ? chapters.flatMap((c) => c.lessons).find((l) => l.id === activeLessonId) || null
      : null;

    return { chaptersState, totalLessons, doneLessons, pct, activeLessonId, activeLesson };
  }, [chapters, progress]);

  const { chaptersState, totalLessons, doneLessons, pct, activeLessonId, activeLesson } = model;

  return (
    <div className="subj-scope">
      <div className="subj-hero">
        <span className="sh-ic">📐</span>
        <div>
          <h1>Toán lớp 6 · Lộ trình</h1>
          <p>
            5 chương · {totalLessons} bài học · mỗi bài là một nhiệm vụ nhỏ → đánh Boss cuối chương
          </p>
        </div>
      </div>

      <div className="subj-overall">
        <div className="so-head">
          <span>Tiến độ Toán 6</span>
          <span>
            {doneLessons}/{totalLessons} bài · {pct}%
          </span>
        </div>
        <div className="so-bar">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      {activeLessonId ? (
        <a className="jh-cta" href={`/module?module=${activeLessonId}&back=${backUrl}`}>
          <span className="jh-cta-ic">▶</span>
          <span className="jh-cta-txt">
            <b>Tiếp tục học</b>
            <small>{activeLesson?.title || ''}</small>
          </span>
          <span className="jh-cta-go">Học ngay →</span>
        </a>
      ) : (
        <div className="jh-cta done">
          <span className="jh-cta-ic">🎉</span>
          <span className="jh-cta-txt">
            <b>Hoàn thành toàn bộ Toán 6!</b>
            <small>Quay lại đạt 3 sao mọi bài nhé</small>
          </span>
        </div>
      )}

      <div style={{ height: 14 }} />

      {chaptersState.map((ch, ci) => (
        <section key={ch.id} className={`chapter ${ch.unlocked ? '' : 'locked'}`}>
          <div className="ch-head">
            <span className="ch-ic">{ch.icon}</span>
            <span className="ch-title">
              Chương {ci + 1}: {ch.title}
            </span>
            <span className="ch-prog">
              {ch.completedCount}/{ch.lessons.length} bài
            </span>
          </div>
          <p className="ch-desc">{ch.desc}</p>
          {!ch.unlocked && (
            <div className="ch-locknote">🔒 Mở khoá khi hoàn thành chương trước</div>
          )}
          <div className="lp-path">
            {ch.lessons.map((l, li) => (
              <LessonNode key={l.id} lesson={l} idx={li} stars={starsOf(l.id)} backUrl={backUrl} />
            ))}
          </div>
        </section>
      ))}

      <style>{styles}</style>
    </div>
  );
}

function LessonNode({
  lesson: l,
  idx,
  stars,
  backUrl,
}: {
  lesson: Lesson & { done: boolean; state: LessonState };
  idx: number;
  stars: number;
  backUrl: string;
}) {
  const starsHtml = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  const icon = l.boss ? '👑' : l.state === 'completed' ? '✓' : '📘';
  const cls = ['lp-node', l.state];
  if (l.boss) cls.push('boss');

  let tag: React.ReactNode = null;
  if (l.state === 'active') tag = <span className="lp-tag t-active">🔥 Học ngay</span>;
  else if (l.state === 'completed') tag = <span className="lp-tag t-done">✓ Xong</span>;
  else if (l.state === 'locked') tag = <span className="lp-tag t-locked">🔒 Khoá</span>;
  else if (l.boss) tag = <span className="lp-tag t-boss">👑 Boss</span>;

  const inner = (
    <>
      <span className="lp-num">{idx + 1}</span>
      <span className="lp-ic">{icon}</span>
      <span className="lp-title">{l.title}</span>
      <span className="lp-meta">
        <span className="lp-stars">{starsHtml}</span>
        <span>{l.count} câu</span>
      </span>
      {tag}
    </>
  );

  if (l.state === 'locked') {
    return <div className={cls.join(' ')}>{inner}</div>;
  }
  return (
    <a className={cls.join(' ')} href={`/module?module=${l.id}&back=${backUrl}`}>
      {inner}
    </a>
  );
}

// Scoped CSS — giữ nguyên thương hiệu của subject.html gốc (gradient nền,
// node pulse, màu sao hổ phách). Toàn bộ đặt trong .subj-scope.
const styles = `
  .subj-scope { color: #fff; }
  .subj-hero { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
  .subj-hero .sh-ic { font-size: 44px; }
  .subj-hero h1 { margin: 0; font-size: 26px; }
  .subj-hero p { margin: 4px 0 0; font-size: 13.5px; opacity: 0.8; }

  .subj-overall { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 16px; margin: 14px 0; }
  .so-head { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; margin-bottom: 6px; }
  .so-bar { height: 12px; border-radius: 8px; background: rgba(255,255,255,0.12); overflow: hidden; }
  .so-bar > i { display: block; height: 100%; background: linear-gradient(90deg,#8b5cf6,#22d3ee); border-radius: 8px; transition: width .8s; }

  .jh-cta { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #fff;
    background: linear-gradient(135deg, rgba(249,115,22,0.22), rgba(139,92,246,0.18));
    border: 1px solid rgba(249,115,22,0.4); border-radius: 14px; padding: 14px 16px; transition: transform .16s; }
  .jh-cta:hover { transform: translateY(-2px); }
  .jh-cta.done { background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(139,92,246,0.16)); border-color: rgba(34,197,94,0.4); }
  .jh-cta-ic { font-size: 26px; }
  .jh-cta-txt { display: flex; flex-direction: column; flex: 1; }
  .jh-cta-txt b { font-size: 15px; }
  .jh-cta-txt small { font-size: 12px; opacity: 0.8; }
  .jh-cta-go { font-size: 13px; font-weight: 800; white-space: nowrap; }

  .chapter { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px; padding: 16px 18px; margin-bottom: 16px; }
  .chapter.locked { opacity: 0.6; }
  .ch-head { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
  .ch-ic { font-size: 26px; }
  .ch-title { font-size: 18px; font-weight: 800; }
  .ch-prog { margin-left: auto; font-size: 12px; font-weight: 700; opacity: 0.85;
    background: rgba(255,255,255,0.08); padding: 3px 10px; border-radius: 999px; }
  .ch-desc { font-size: 12.5px; opacity: 0.7; margin: 0 0 14px; }
  .ch-locknote { font-size: 12.5px; color: #cbd5e1; opacity: 0.85; margin-bottom: 10px; }

  .lp-path { display: flex; flex-wrap: wrap; gap: 14px 10px; align-items: stretch; }
  .lp-node {
    position: relative; width: 150px; min-height: 116px;
    background: rgba(0,0,0,0.28); border: 2px solid rgba(255,255,255,0.16);
    border-radius: 14px; padding: 12px; text-decoration: none; color: #fff;
    display: flex; flex-direction: column; gap: 6px; transition: all .16s;
  }
  .lp-node .lp-num { position: absolute; top: -10px; left: -10px; width: 26px; height: 26px;
    border-radius: 50%; background: #334155; display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; border: 2px solid rgba(255,255,255,0.2); }
  .lp-ic { font-size: 24px; }
  .lp-title { font-size: 13px; font-weight: 700; line-height: 1.3; flex: 1; }
  .lp-meta { display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
  .lp-stars { color: #fbbf24; letter-spacing: 1px; }
  .lp-tag { font-size: 9.5px; font-weight: 800; padding: 2px 7px; border-radius: 999px; }

  .lp-node.completed { border-color: #22c55e; background: rgba(34,197,94,0.16); }
  .lp-node.completed .lp-num { background: #22c55e; color: #06281a; }
  .lp-node.active { border-color: #f97316; cursor: pointer;
    box-shadow: 0 0 0 1px rgba(249,115,22,.5), 0 10px 26px rgba(249,115,22,.25);
    animation: lpPulse 1.8s infinite; }
  .lp-node.active .lp-num { background: #f97316; color: #1f1147; }
  .lp-node.unlocked { cursor: pointer; }
  .lp-node.unlocked:hover, .lp-node.active:hover, .lp-node.completed:hover { transform: translateY(-3px); border-color: #fbbf24; }
  .lp-node.locked { opacity: 0.5; filter: grayscale(0.4); cursor: not-allowed; }
  .lp-node.boss { background: linear-gradient(160deg, rgba(251,191,36,0.18), rgba(0,0,0,0.3)); border-color: #fbbf24; }
  .lp-node.boss.completed { background: linear-gradient(160deg, rgba(251,191,36,0.22), rgba(34,197,94,0.18)); }
  .lp-tag.t-active { background: #f97316; color: #1f1147; }
  .lp-tag.t-done { background: rgba(34,197,94,0.25); color: #6ee7b7; }
  .lp-tag.t-locked { background: rgba(148,163,184,0.22); color: #cbd5e1; }
  .lp-tag.t-boss { background: #fbbf24; color: #1f1147; }
  @keyframes lpPulse { 0%{box-shadow:0 0 0 0 rgba(249,115,22,.5)} 70%{box-shadow:0 0 0 9px rgba(249,115,22,0)} 100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} }
`;
