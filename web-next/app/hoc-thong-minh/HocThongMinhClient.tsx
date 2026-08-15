'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ── Landing tĩnh cho các domain non-ScoreUp ────────────────────────────
// GIỮ NGUYÊN từ trang gốc: đây là ĐIỀU HƯỚNG UI (label + link nội bộ), không
// phải nội dung học. ScoreUp chỉ có câu hỏi Dược/SV nên K-12 + Ngoại ngữ + Lái
// xe được đưa thẳng sang các app hub thật thay vì quiz adaptive rỗng.
type LandingApp = { ic: string; name: string; rd: string; href: string };
type Landing = {
  title: string;
  intro: string;
  back?: { label: string; href: string };
  apps: LandingApp[];
};

const SUBJ_LANDINGS: Record<string, Landing> = {
  preschool: {
    title: '🧸 Học thông minh · Mầm non',
    intro: 'Mầm non học bằng trò chơi tương tác — chọn 1 hoạt động bên dưới:',
    back: { label: 'Quay về campus Mầm non', href: '/school.html?domain=preschool' },
    apps: [
      { ic: '🗺️', name: 'Không gian học Mầm non', rd: 'Chọn lớp lá/chồi/mầm, học theo 5 lĩnh vực phát triển GDPT 2018.', href: '/space.html?domain=preschool' },
      { ic: '🔢', name: 'Đếm quả & đếm ngón tay', rd: 'Trò chơi đếm số trực quan, phù hợp 3–5 tuổi.', href: '/dem-qua.html' },
      { ic: '🔤', name: 'Ghép chữ cái', rd: 'Nhận mặt chữ, ghép vần qua trò chơi kéo thả.', href: '/ghep-chu-cai.html' },
    ],
  },
  primary: {
    title: '🎒 Học thông minh · Tiểu học',
    intro: 'Tiểu học (lớp 1–5) học theo tuần — chọn 1 cổng vào:',
    back: { label: 'Quay về campus Tiểu học', href: '/school.html?domain=primary' },
    apps: [
      { ic: '🗺️', name: 'Không gian học Tiểu học', rd: '9 môn × 36 tuần (KNTT/CTST/CD), có lý thuyết + quiz tuần.', href: '/space.html?domain=primary' },
      { ic: '🎯', name: 'Năng lực của em', rd: '15 nhóm năng lực GDPT 2018 — xem em đã đạt skill nào.', href: '/nang-luc.html' },
      { ic: '⛈️', name: 'Bão Số Học', rd: 'Mini-game luyện tính nhanh — thêm Cây Tri Thức, Bản đồ VN trong Không gian học.', href: '/bao-so-hoc.html' },
      { ic: '🤖', name: 'AI sinh đề luyện tập', rd: 'AI tự sinh quiz theo chủ đề + lớp em chọn, kèm giải thích.', href: '/ai-quiz-gen.html?grade=3' },
    ],
  },
  secondary: {
    title: '📐 Học thông minh · THCS',
    intro: 'THCS (lớp 6–9) — Lớp 6 có 12 môn × 36 tuần, Lớp 7–9 hiện có Toán & Ngữ văn. Chọn 1 cổng vào:',
    back: { label: 'Quay về campus THCS', href: '/school.html?domain=secondary' },
    apps: [
      { ic: '🗺️', name: 'Không gian học THCS', rd: '12 môn lớp 6 + Toán/Ngữ văn 7–9 theo CT GDPT 2018.', href: '/space.html?domain=secondary' },
      { ic: '🎯', name: 'Năng lực của em', rd: 'Skill THCS đã đạt + còn thiếu, lộ trình mở khóa kế tiếp.', href: '/nang-luc.html' },
      { ic: '🗺️', name: 'Bản đồ Tri thức VN', rd: '34 tỉnh thành (sau sáp nhập 2025) — đặc sản, danh lam, quiz địa lý + lịch sử.', href: '/ban-do-vn.html' },
      { ic: '📝', name: 'Luyện đề vào lớp 10', rd: 'Đề thi thử có bấm giờ + chấm điểm: Toán, Văn, Anh lớp 9.', href: '/luyen-de.html' },
      { ic: '🤖', name: 'AI sinh đề luyện tập', rd: 'AI tự sinh quiz theo chủ đề + lớp em chọn, kèm giải thích.', href: '/ai-quiz-gen.html?grade=6' },
    ],
  },
  highschool: {
    title: '🎓 Học thông minh · THPT',
    intro: 'THPT (lớp 10–12) — chọn 1 cổng vào để ôn tập + luyện thi:',
    back: { label: 'Quay về campus THPT', href: '/school.html?domain=highschool' },
    apps: [
      { ic: '🗺️', name: 'Không gian học THPT', rd: 'Toán, Văn, Anh, Lý, Hoá, Sinh, Sử, Địa theo CT GDPT 2018.', href: '/space.html?domain=highschool' },
      { ic: '🎯', name: 'Năng lực của em', rd: 'Skill THPT + lộ trình ôn thi tốt nghiệp.', href: '/nang-luc.html' },
      { ic: '📝', name: 'Luyện đề thi TN THPT', rd: 'Đề thi thử có bấm giờ + chấm điểm: Toán, Anh, GDKT-PL.', href: '/luyen-de.html' },
      { ic: '📚', name: '2000 từ vựng tiếng Anh', rd: '5 chủ đề: cơ bản, du lịch, kinh doanh, học thuật, IELTS.', href: '/tu-vung-tieng-anh.html' },
      { ic: '🤖', name: 'AI sinh đề luyện thi', rd: 'AI tự sinh đề theo chuyên đề lớp 10–12, kèm lời giải.', href: '/ai-quiz-gen.html?grade=12' },
    ],
  },
  language: {
    title: '🗣️ Học Ngoại ngữ thông minh',
    intro: 'Trường Ngoại ngữ dùng các app chuyên biệt thay vì quiz tổng quát. Chọn 1 hoạt động bên dưới để học:',
    back: { label: 'Quay về campus Ngoại ngữ', href: '/school.html?domain=language' },
    apps: [
      { ic: '📚', name: '2000 từ vựng tiếng Anh', rd: '5 chủ đề: cơ bản, du lịch, kinh doanh, học thuật, IELTS — spaced repetition + phát âm.', href: '/tu-vung-tieng-anh.html' },
      { ic: '🎤', name: 'Luyện phát âm AI', rd: 'Đọc câu mẫu, AI chấm bằng Speech Recognition, score theo từng từ.', href: '/luyen-phat-am.html' },
      { ic: '🃏', name: 'Flashcards đa ngôn ngữ', rd: 'Tự nhập bộ thẻ EN/JP/KR/CN, lưu localStorage cá nhân.', href: '/portal-apps/u/4/flashcards/' },
    ],
  },
  driving: {
    title: '🚗 Học Lái xe thông minh',
    intro: 'Trường Lái xe dùng bộ đề + biển báo chuyên biệt. Chọn 1 hoạt động bên dưới:',
    back: { label: 'Quay về campus Lái xe', href: '/school.html?domain=driving' },
    apps: [
      { ic: '📖', name: '600 câu lý thuyết B1/B2', rd: 'Luyện theo chương + thi thử 25 câu/22 phút. Có CÂU LIỆT.', href: '/luat-giao-thong-600.html' },
      { ic: '🚸', name: 'Biển báo Giao thông', rd: 'Học 4 nhóm QCVN 41:2019 + chế độ đố vui có streak.', href: '/bien-bao-giao-thong.html' },
      { ic: '📚', name: 'Tra cứu biển báo GPLX', rd: 'Danh mục đầy đủ 257 biển (cấm/nguy hiểm/hiệu lệnh/chỉ dẫn/phụ) — biển cấm có kèm mức phạt theo NĐ 168/2024.', href: '/tra-cuu-bien-bao-gplx' },
      { ic: '📷', name: 'Nhận diện biển báo bằng AI', rd: 'Chụp ảnh hoặc tải ảnh lên, AI nhận diện ngay trên trình duyệt — không gửi ảnh lên máy chủ.', href: '/nhan-dien-bien-bao' },
      { ic: '🧠', name: 'AI Quiz tình huống', rd: 'AI sinh tình huống lái xe thực tế theo cấp B1/B2/C/D.', href: '/ai-quiz-gen.html?topic=driving' },
    ],
  },
  'driving-admin': {
    title: '📋 Thủ tục hành chính · Trường Lái xe',
    intro: 'AI tư vấn quy trình thi sát hạch, cấp đổi GPLX, đăng ký lệ phí. Hiện đang biên soạn — tạm thời tham khảo:',
    back: { label: 'Quay về Văn phòng cấp GPLX', href: '/space.html?b=admin-drive&domain=driving' },
    apps: [
      { ic: '📖', name: '600 câu lý thuyết', rd: 'Phải đạt trước khi nộp hồ sơ thi.', href: '/luat-giao-thong-600.html' },
    ],
  },
};

const K12_DOMAINS = new Set(['preschool', 'primary', 'secondary', 'highschool']);

// ── Types API ──────────────────────────────────────────────────────────
type Subject = { id: string | number; name?: string; slug?: string };
type Theta = { theta: number; n_attempts: number; level: string };
type SkillRec = {
  name: string;
  competency: { code?: string; name: string };
  grade_min?: number | null;
  grade_max?: number | null;
  prereq_progress: number;
};
type QAnswer = { id?: string; value?: string; text?: string; label?: string; content?: string };
type Question = {
  id: string;
  question?: string;
  body?: string;
  question_type?: string;
  answers?: QAnswer[];
  options?: QAnswer[];
};
type AttemptRes = {
  correct?: boolean;
  correct_answers?: (string | number)[];
  explanation?: string | null;
};

type Feedback = { correct: boolean; text: string; explanation?: string | null; correctAnswers?: string[] };

// ── Component ──────────────────────────────────────────────────────────
export default function HocThongMinhClient() {
  const [status, setStatus] = useState<'loading' | 'landing' | 'login' | 'ready' | 'error'>('loading');
  const [landing, setLanding] = useState<Landing | null>(null);
  const [errMsg, setErrMsg] = useState('');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentSubject, setCurrentSubject] = useState('');
  const [theta, setTheta] = useState<Theta>({ theta: 0, n_attempts: 0, level: 'Trung bình' });
  const [recs, setRecs] = useState<SkillRec[]>([]);

  const [question, setQuestion] = useState<Question | null>(null);
  const [expectedDifficulty, setExpectedDifficulty] = useState(0);
  const [qError, setQError] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // Refs để tránh stale closure trong các thao tác tuần tự.
  const excludeIds = useRef<string[]>([]);
  const currentSubjectRef = useRef('');
  currentSubjectRef.current = currentSubject;

  const loadTheta = useCallback(async (subjectId: string) => {
    const r = await fetch(`/api/learning/theta?subject_id=${encodeURIComponent(subjectId)}`, { credentials: 'same-origin' });
    const t: Theta = r.ok ? await r.json() : { theta: 0, n_attempts: 0, level: 'Trung bình' };
    setTheta(t);
    return t;
  }, []);

  const loadRecommendations = useCallback(async () => {
    const r = await fetch('/api/skills/next-recommended?limit=6', { credentials: 'same-origin' });
    setRecs(r.ok ? (await r.json()).items || [] : []);
  }, []);

  const loadNextQuestion = useCallback(async (subjectId: string) => {
    setSelectedOption(null);
    setAnswered(false);
    setFeedback(null);
    setQError('');
    if (!subjectId) {
      setQuestion(null);
      return;
    }
    const r = await fetch('/api/quiz/adaptive-next', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject_id: subjectId, exclude_ids: excludeIds.current.slice(-20) }),
      credentials: 'same-origin',
    });
    if (!r.ok) {
      let msg = '';
      try { msg = (await r.json()).error || ''; } catch { /* ignore */ }
      setQuestion(null);
      setQError(msg);
      return;
    }
    const data = await r.json();
    setQuestion(data.question || null);
    setExpectedDifficulty(data.expected_difficulty ?? 0);
  }, []);

  // Init
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const subjectParam = new URLSearchParams(window.location.search).get('subject') || '';
      // Domain-specific landing — short-circuit ScoreUp quiz.
      if (subjectParam && SUBJ_LANDINGS[subjectParam]) {
        setLanding(SUBJ_LANDINGS[subjectParam]);
        setStatus('landing');
        return;
      }
      try {
        const meRes = await fetch('/api/auth/me', { credentials: 'same-origin' });
        if (meRes.status === 401) {
          if (!cancelled) setStatus('login');
          return;
        }
        // Auto-landing cho K-12: ScoreUp chưa có câu hỏi cấp phổ thông → adaptive
        // quiz sẽ trống. Đẩy thẳng sang landing /space.html?domain=<id>.
        try {
          const me = (await meRes.clone().json())?.user;
          const dom: string | undefined = me?.enrolled_domain;
          if (dom && K12_DOMAINS.has(dom) && SUBJ_LANDINGS[dom]) {
            if (!cancelled) {
              setLanding(SUBJ_LANDINGS[dom]);
              setStatus('landing');
            }
            return;
          }
        } catch { /* ignore */ }

        const subjRes = await fetch('/api/quiz/subjects', { credentials: 'same-origin' });
        let subs: Subject[] = [];
        let firstSid = '';
        if (subjRes.ok) {
          const data = await subjRes.json();
          const list = data.data || data.items || data || [];
          subs = (Array.isArray(list) ? list : []).slice(0, 12);
          if (subs.length > 0) firstSid = String(subs[0].id);
        }
        if (cancelled) return;
        setSubjects(subs);
        setCurrentSubject(firstSid);
        currentSubjectRef.current = firstSid;
        await Promise.all([loadTheta(firstSid), loadRecommendations(), loadNextQuestion(firstSid)]);
        if (!cancelled) setStatus('ready');
      } catch (e) {
        if (!cancelled) {
          setErrMsg(e instanceof Error ? e.message : String(e));
          setStatus('error');
        }
      }
    })();
    return () => { cancelled = true; };
  }, [loadTheta, loadRecommendations, loadNextQuestion]);

  const pickSubject = useCallback(async (sid: string) => {
    setCurrentSubject(sid);
    currentSubjectRef.current = sid;
    excludeIds.current = [];
    await Promise.all([loadTheta(sid), loadNextQuestion(sid)]);
  }, [loadTheta, loadNextQuestion]);

  const submitAnswer = useCallback(async () => {
    const q = question;
    if (!q || selectedOption == null || answered) return;
    try {
      const r = await fetch('/api/quiz/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question_id: q.id, answer: selectedOption }),
        credentials: 'same-origin',
      });
      const data: AttemptRes = await r.json();
      const correctAnswers = (data.correct_answers || []).map(String);
      setAnswered(true);
      setFeedback({
        correct: !!data.correct,
        text: data.correct ? '✓ Đúng rồi!' : `✗ Chưa đúng. Đáp án: ${correctAnswers.join(', ')}`,
        explanation: data.explanation,
        correctAnswers,
      });
      excludeIds.current.push(q.id);
      await loadTheta(currentSubjectRef.current);
    } catch (e) {
      console.warn('[hoc-thong-minh] submit error', e);
    }
  }, [question, selectedOption, answered, loadTheta]);

  const skipNext = useCallback(async () => {
    if (!answered && question) excludeIds.current.push(question.id);
    await loadNextQuestion(currentSubjectRef.current);
    // Refresh recommendations sau đủ số câu (giữ hành vi gốc: mỗi 5 câu).
    if (theta.n_attempts % 5 === 0) await loadRecommendations();
  }, [answered, question, theta.n_attempts, loadNextQuestion, loadRecommendations]);

  // ── Render states ─────────────────────────────────────────────────────
  if (status === 'loading') {
    return <div className="py-16 text-center text-muted-foreground">Đang tải…</div>;
  }

  if (status === 'login') {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để học thông minh.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">Đăng nhập →</Link>
      </div>
    );
  }

  if (status === 'error') {
    return <p className="py-16 text-center text-rose-400">Lỗi: {errMsg}</p>;
  }

  if (status === 'landing' && landing) {
    return <LandingView landing={landing} />;
  }

  // status === 'ready'
  const thetaPct = Math.round(((theta.theta + 3) / 6) * 100);
  const answers = question ? question.answers || question.options || [] : [];

  return (
    <div className="w-full space-y-4">
      {/* Level card */}
      <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-violet-400/35 bg-gradient-to-br from-violet-500/20 to-blue-500/10 p-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-4xl shadow-lg shadow-indigo-500/40">
          🧠
        </div>
        <div className="min-w-[200px] flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Trình độ AI đánh giá</div>
          <div className="my-1 text-2xl font-extrabold text-violet-300">{theta.level || 'Trung bình'}</div>
          <div className="text-[13px] text-muted-foreground">
            θ = <b className="text-amber-400">{(theta.theta || 0).toFixed(2)}</b> · {theta.n_attempts || 0} câu đã làm ·{' '}
            {currentSubject ? 'môn đang học' : 'tổng quát'}
          </div>
          <div className="relative mt-2 h-2 overflow-visible rounded-md bg-white/10">
            <span
              className="block h-full rounded-md bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 transition-[width] duration-500"
              style={{ width: `${thetaPct}%` }}
            />
            <span
              className="absolute -top-1 h-4 w-[3px] -translate-x-1/2 rounded-sm bg-white transition-[left] duration-500"
              style={{ left: `${thetaPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Subject picker */}
      <SectionTitle ic="📚">Chọn môn:</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {subjects.length > 0 ? (
          subjects.map((s) => {
            const sid = String(s.id);
            const cur = sid === currentSubject;
            return (
              <button
                key={sid}
                type="button"
                onClick={() => pickSubject(sid)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-[13px] transition-colors',
                  cur
                    ? 'border-violet-400 bg-violet-400 font-bold text-white'
                    : 'border-border bg-white/5 hover:bg-white/10',
                )}
              >
                {s.name || s.slug || sid}
              </button>
            );
          })
        ) : (
          <span className="text-muted-foreground">Chưa có môn nào.</span>
        )}
      </div>

      {/* Adaptive question */}
      <SectionTitle ic="🎯">Câu hỏi tiếp theo (adaptive)</SectionTitle>
      {qError ? (
        <div className="py-8 text-center text-muted-foreground">⚠ {qError} — chọn môn khác hoặc thử lại sau.</div>
      ) : !question ? (
        <div className="py-8 text-center text-muted-foreground">Chưa có câu hỏi.</div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-2.5 flex gap-3.5 text-[11.5px] text-muted-foreground">
            <span>Độ khó: <b className="text-amber-400">{(expectedDifficulty ?? 0).toFixed(2)}</b></span>
            <span>θ của em: <b className="text-amber-400">{(theta.theta ?? 0).toFixed(2)}</b></span>
            <span>Loại: {question.question_type || 'mcq_single'}</span>
          </div>
          <div className="my-2 mb-4 text-base font-semibold leading-relaxed">
            {question.question || question.body || '(không có nội dung)'}
          </div>
          <div>
            {answers.map((a, i) => {
              const val = String(a.id ?? a.value ?? i);
              const label = a.text || a.label || a.content || String(a);
              const isSelected = selectedOption === val;
              const isCorrect = answered && feedback?.correctAnswers?.includes(val);
              const isWrong = answered && isSelected && !isCorrect;
              return (
                <button
                  key={val}
                  type="button"
                  disabled={answered}
                  onClick={() => { if (!answered) setSelectedOption(val); }}
                  className={cn(
                    'my-1.5 block w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                    isCorrect
                      ? 'border-emerald-400 bg-emerald-500/20'
                      : isWrong
                        ? 'border-rose-400 bg-rose-500/15'
                        : isSelected
                          ? 'border-violet-400 bg-violet-400/20'
                          : 'border-white/10 bg-white/[0.04] hover:border-violet-400/40 hover:bg-violet-400/10',
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="mt-3.5 flex gap-2.5">
            <button
              type="button"
              onClick={submitAnswer}
              disabled={answered || selectedOption == null}
              className="rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {answered ? '✓ Đã chấm' : 'Nộp câu trả lời'}
            </button>
            <button
              type="button"
              onClick={skipNext}
              className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold text-foreground"
            >
              {answered ? 'Câu kế tiếp →' : 'Bỏ qua'}
            </button>
          </div>
          {feedback && (
            <div
              className={cn(
                'mt-3.5 rounded-lg border-l-[3px] px-3.5 py-2.5 text-[13.5px] leading-relaxed',
                feedback.correct
                  ? 'border-emerald-400 bg-emerald-500/12 text-emerald-300'
                  : 'border-rose-400 bg-rose-500/10 text-rose-300',
              )}
            >
              <div>{feedback.text}</div>
              {feedback.explanation && <div className="mt-1 text-xs opacity-90">{feedback.explanation}</div>}
            </div>
          )}
        </div>
      )}

      {/* Recommended skills */}
      <SectionTitle ic="🗺️">Kỹ năng nên học kế tiếp</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recs.length > 0 ? (
          recs.map((r, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 transition-transform hover:-translate-y-0.5 hover:border-violet-400">
              <div className="mb-1.5 text-sm font-bold leading-snug">{r.name}</div>
              <div className="text-[11.5px] text-muted-foreground">{r.competency.name}</div>
              {r.grade_min != null && (
                <div className="mt-2 inline-block rounded-full bg-amber-400/12 px-2 py-0.5 text-[11px] font-bold text-amber-400">
                  Lớp {r.grade_min}
                  {r.grade_max && r.grade_max !== r.grade_min ? `–${r.grade_max}` : ''}
                </div>
              )}
              <div className="mt-2 h-1 overflow-hidden rounded bg-white/[0.06]">
                <span className="block h-full bg-violet-400 transition-[width] duration-500" style={{ width: `${r.prereq_progress}%` }} />
              </div>
              <div className="mt-1 text-[10.5px] text-muted-foreground">Sẵn sàng học: {r.prereq_progress}%</div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-6 text-center text-muted-foreground">
            Em đã đạt tất cả kỹ năng đề xuất — quay lại sau khi mở khoá thêm nội dung.
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ ic, children }: { ic: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-6 mb-3 flex items-center gap-2 text-base font-extrabold">
      <span className="text-xl">{ic}</span>
      {children}
    </h2>
  );
}

function LandingView({ landing }: { landing: Landing }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[22px] font-bold">{landing.title}</h1>
        {landing.back && (
          <a
            href={landing.back.href}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-border bg-white/5 px-3 py-1.5 text-[13px] font-semibold hover:bg-white/10"
          >
            ← {landing.back.label}
          </a>
        )}
      </div>
      <p className="mb-6 leading-relaxed text-muted-foreground">{landing.intro}</p>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {landing.apps.map((a, i) => (
          <a
            key={i}
            href={a.href}
            className="block rounded-2xl border border-border bg-white/5 p-4.5 no-underline transition-transform hover:-translate-y-0.5 hover:border-violet-400"
          >
            <div className="mb-2 text-3xl">{a.ic}</div>
            <div className="mb-1 text-[15.5px] font-bold">{a.name}</div>
            <div className="text-[13px] leading-relaxed text-muted-foreground">{a.rd}</div>
            <div className="mt-3 text-[13px] font-semibold text-violet-400">Vào ngay →</div>
          </a>
        ))}
      </div>
    </div>
  );
}
