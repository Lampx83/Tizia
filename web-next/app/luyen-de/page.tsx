'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Content (bộ đề) LẤY TỪ DB qua /api/content/exam-sets — KHÔNG hardcode.
type Question = { q: string; o: string[]; a: number; ex?: string };
type Exam = {
  id: string;
  title: string;
  exam: string;
  subject?: string;
  grade?: number;
  durationMin: number;
  passScore?: number;
  questions: Question[];
};

// Nhãn UI tĩnh (không phải content nghiệp vụ) — giữ nguyên từ trang gốc.
const EXAM_LABEL: Record<string, string> = {
  'tn-thpt': '🎓 Thi tốt nghiệp THPT',
  'vao-10': '📘 Thi vào lớp 10',
};
const SUBJ: Record<string, string> = {
  toan: 'Toán',
  'ngu-van': 'Ngữ văn',
  van: 'Ngữ văn',
  anh: 'Tiếng Anh',
  'tieng-anh': 'Tiếng Anh',
  gdktpl: 'GD Kinh tế & Pháp luật',
};

type Phase = 'loading' | 'list' | 'running';

export default function LuyenDePage() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [exams, setExams] = useState<Exam[]>([]);
  const [current, setCurrent] = useState<Exam | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch('/api/content/exam-sets', { credentials: 'same-origin' });
        const items: Exam[] = r.ok ? (await r.json()).items || [] : [];
        if (alive) {
          setExams(items);
          setPhase('list');
        }
      } catch {
        if (alive) {
          setExams([]);
          setPhase('list');
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  function startExam(id: string) {
    const exam = exams.find((e) => e.id === id);
    if (!exam) return;
    setCurrent(exam);
    setPhase('running');
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  function backToList() {
    setCurrent(null);
    setPhase('list');
  }

  return (
    <div className="w-full">
      <header className="mb-4 flex items-center gap-3">
        <h1 className="text-lg font-semibold">📝 Luyện đề thi</h1>
        <Link href="/" className="ml-auto text-sm text-muted-foreground hover:underline">
          ← Trang chủ
        </Link>
      </header>

      {phase === 'loading' && <div className="py-10 text-center text-muted-foreground">Đang tải đề…</div>}

      {phase === 'list' && <ExamList exams={exams} onStart={startExam} />}

      {phase === 'running' && current && <ExamRunner exam={current} onBack={backToList} />}
    </div>
  );
}

function ExamList({ exams, onStart }: { exams: Exam[]; onStart: (id: string) => void }) {
  const groups = useMemo(() => {
    const g: Record<string, Exam[]> = {};
    for (const e of exams) (g[e.exam] = g[e.exam] || []).push(e);
    return g;
  }, [exams]);

  if (!exams.length) {
    return <div className="py-10 text-center text-muted-foreground">Chưa có đề nào.</div>;
  }

  return (
    <div>
      {Object.entries(groups).map(([k, list]) => (
        <div key={k}>
          <div className="mb-2.5 mt-5 text-sm font-extrabold uppercase tracking-wide text-primary">
            {EXAM_LABEL[k] || k}
          </div>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {list.map((e) => (
              <button
                key={e.id}
                onClick={() => onStart(e.id)}
                className="rounded-[13px] border border-border bg-card p-4 text-left transition-transform hover:-translate-y-0.5 hover:border-[#a78bfa]"
              >
                <div className="mb-1.5 text-[15px] font-bold">{e.title}</div>
                <div className="flex flex-wrap gap-2.5 text-[12.5px] text-muted-foreground">
                  <span>{SUBJ[e.subject || ''] || e.subject || ''}</span>
                  <span>📝 {e.questions.length} câu</span>
                  <span>⏱ {e.durationMin}′</span>
                </div>
                <div className="mt-2.5 text-[13px] font-semibold text-[#a78bfa]">Bắt đầu →</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExamRunner({ exam, onBack }: { exam: Exam; onBack: () => void }) {
  const total = exam.questions.length;
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.durationMin * 60000);
  const endAtRef = useRef(Date.now() + exam.durationMin * 60000);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const submittedRef = useRef(false);

  const answeredCount = Object.keys(answers).length;
  const rightCount = submitted
    ? exam.questions.reduce((n, q, i) => (answers[i] === q.a ? n + 1 : n), 0)
    : 0;
  const score10 = submitted ? Math.round((rightCount / total) * 100) / 10 : 0;
  const pass = submitted ? score10 >= (exam.passScore || 5) : false;

  function doSubmit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitted(true);
  }

  // Đồng hồ đếm ngược; hết giờ tự nộp.
  useEffect(() => {
    const id = setInterval(() => {
      const left = endAtRef.current - Date.now();
      if (left <= 0) {
        setTimeLeft(0);
        clearInterval(id);
        doSubmit();
        return;
      }
      setTimeLeft(left);
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dừng đồng hồ + cuộn tới kết quả sau khi nộp.
  useEffect(() => {
    if (submitted) resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [submitted]);

  const mm = String(Math.floor(timeLeft / 60000)).padStart(2, '0');
  const ss = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0');

  function pick(i: number, j: number) {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [i]: j }));
  }

  return (
    <div>
      <div className="sticky top-0 z-[5] mb-3.5 flex flex-wrap items-center gap-3 py-2.5 backdrop-blur [background:rgba(15,23,42,.92)]">
        <span className="text-lg font-extrabold tabular-nums text-primary">
          {mm}:{ss}
        </span>
        <span className="text-[13px] text-muted-foreground">
          {answeredCount}/{total}
        </span>
        {!submitted && (
          <button
            onClick={() => {
              if (window.confirm('Nộp bài và xem kết quả?')) doSubmit();
            }}
            className="ml-auto rounded-[9px] border border-primary bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-[#1a1205] hover:brightness-110"
          >
            Nộp bài
          </button>
        )}
      </div>

      <div>
        {submitted && (
          <div
            ref={resultRef}
            className={cn(
              'mb-4 rounded-[14px] border bg-card p-[22px] text-center',
              pass ? 'border-[#22c55e]' : 'border-[#ef4444]',
            )}
          >
            <div className="text-[42px] font-extrabold" style={{ color: pass ? '#22c55e' : '#ef4444' }}>
              {score10}/10
            </div>
            <div className="mt-1 text-lg font-bold">
              {pass ? '✅ Đạt' : '❌ Chưa đạt'} · đúng {rightCount}/{total} câu
            </div>
          </div>
        )}

        {exam.questions.map((q, i) => {
          const picked = answers[i];
          return (
            <div key={i} className="mb-3 rounded-[13px] border border-border bg-card px-[18px] py-4">
              <div className="mb-2.5 font-semibold">
                <span className="text-primary">Câu {i + 1}.</span> {q.q}
              </div>
              {q.o.map((o, j) => {
                const isSel = picked === j;
                const isCorrect = submitted && j === q.a;
                const isWrong = submitted && j === picked && j !== q.a;
                return (
                  <label
                    key={j}
                    onClick={() => pick(i, j)}
                    className={cn(
                      'my-1.5 block cursor-pointer rounded-[10px] border px-3.5 py-2.5 text-sm transition-colors',
                      'border-white/10 bg-white/[.04] hover:bg-[rgba(167,139,250,.1)]',
                      isSel && 'border-[#a78bfa] !bg-[rgba(167,139,250,.18)]',
                      isCorrect && '!border-[#22c55e] !bg-[rgba(34,197,94,.18)]',
                      isWrong && '!border-[#ef4444] !bg-[rgba(239,68,68,.16)]',
                    )}
                  >
                    {o}
                  </label>
                );
              })}
              {submitted && (
                <div className="mt-2 rounded-md border-l-[3px] border-[#a78bfa] bg-[rgba(167,139,250,.07)] px-2.5 py-1.5 text-[13px] text-muted-foreground">
                  💡 {q.ex || ''}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="mt-2.5 rounded-[9px] border border-border bg-white/[.08] px-4 py-2.5 text-[13.5px] font-semibold hover:brightness-110"
      >
        ← Về danh sách đề
      </button>
    </div>
  );
}
