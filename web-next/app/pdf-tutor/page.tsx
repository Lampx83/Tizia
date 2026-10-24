'use client';

// PDF Tutor — Gia sư PDF: mở/dán SGK dạng PDF, AI giảng giải + sinh quiz theo
// từng trang. Migrate 1-1 từ public/pdf-tutor.html sang Client Component.
//
// pdf.js được nạp ĐỘNG từ CDN trong useEffect (client-only) — giữ nguyên nguồn
// như trang gốc, KHÔNG copy content nào vào code. Nội dung học (giảng/quiz) đến
// từ API AI /api/ai/pdf-explain + /api/ai/pdf-quiz (nguồn Ollama, không hardcode).

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { pickVoice } from '@/lib/tts';

const PDFJS_SRC = '/vendor/pdfjs-4.7.76/build/pdf.mjs';
const PDFJS_WORKER = '/vendor/pdfjs-4.7.76/build/pdf.worker.mjs';

type Tab = 'explain' | 'summary' | 'example' | 'vocab' | 'quiz';

type QuizQ = {
  stem: string;
  options?: string[];
  correct: number;
  explain?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PdfDoc = any;

const SUBJECTS: [string, string][] = [
  ['toan', 'Toán'],
  ['vat_ly', 'Vật lý'],
  ['hoa', 'Hoá'],
  ['sinh', 'Sinh'],
  ['ngu_van', 'Ngữ văn'],
  ['lich_su', 'Lịch sử'],
  ['dia', 'Địa lí'],
  ['tin_hoc', 'Tin học'],
  ['tieng_anh', 'Tiếng Anh'],
  ['gdcd', 'GDCD'],
  ['cong_nghe', 'Công nghệ'],
];

const GRADES = ['6', '7', '8', '9', '10', '11', '12'];

const BOOK_SERIES: [string, string][] = [
  ['', 'Bộ sách'],
  ['canh_dieu', 'Cánh Diều'],
  ['ket_noi', 'Kết Nối Tri Thức'],
  ['chan_troi', 'Chân Trời Sáng Tạo'],
];

const TABS: [Tab, string][] = [
  ['explain', '📚 Giảng'],
  ['summary', '📝 Tóm tắt'],
  ['example', '💡 Ví dụ'],
  ['vocab', '🔤 Từ vựng'],
  ['quiz', '📋 Quiz'],
];

function speak(t: string) {
  if (typeof window === 'undefined' || typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  if (!t) return;
  const chunks = t.match(/[^.!?]+[.!?]?/g) || [t];
  for (const c of chunks.slice(0, 12)) {
    const u = new SpeechSynthesisUtterance(c.trim());
    u.lang = 'vi-VN';
    u.rate = 1.0;
    const v = pickVoice('vi'); // giọng chọn theo chất lượng — lib/tts.ts
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }
}

// Danh tính người học cho adaptive/event — cùng logic adaptive-bridge.js.
function learner(): string {
  try {
    return (
      localStorage.getItem('tizia:playerName') ||
      localStorage.getItem('player.name') ||
      localStorage.getItem('playerName') ||
      'Ẩn danh'
    ).slice(0, 40);
  } catch {
    return 'Ẩn danh';
  }
}

export default function PdfTutorPage() {
  const [pdf, setPdf] = useState<PdfDoc | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [grade, setGrade] = useState('11');
  const [subject, setSubject] = useState('toan');
  const [bookSeries, setBookSeries] = useState('ket_noi');
  const [tab, setTab] = useState<Tab>('explain');

  const [outText, setOutText] = useState(
    'Hãy mở file PDF + bấm "Chạy AI" — AI sẽ giảng nội dung trang hiện tại.',
  );
  const [thinking, setThinking] = useState(false);
  const [quiz, setQuiz] = useState<QuizQ[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [focusText, setFocusText] = useState('');

  const [selPopup, setSelPopup] = useState<{ x: number; y: number; text: string } | null>(null);

  const pdfjsRef = useRef<PdfDoc | null>(null);
  const scale = 1.5;
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderingTaskRef = useRef<any>(null);
  const currentPageTextRef = useRef('');

  // Nạp pdf.js từ CDN một lần (client-only).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const lib = await import(/* webpackIgnore: true */ PDFJS_SRC);
        if (cancelled) return;
        lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        pdfjsRef.current = lib;
      } catch {
        /* để trống — nếu CDN chặn, mở file sẽ báo lỗi ở handler */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelection = useCallback(() => {
    const sel = window.getSelection();
    const text = (sel?.toString() || '').trim();
    if (!text || text.length < 5) {
      setSelPopup(null);
      return;
    }
    const range = sel!.getRangeAt(0).getBoundingClientRect();
    setSelPopup({
      x: range.left + window.scrollX,
      y: range.top + window.scrollY - 36,
      text,
    });
  }, []);

  // Render trang hiện tại (canvas + lớp text vô hình để bôi đen).
  const renderPage = useCallback(async () => {
    const lib = pdfjsRef.current;
    const container = pageContainerRef.current;
    if (!pdf || !lib || !container) return;

    container.innerHTML = '';
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    canvas.style.background = 'white';
    canvas.style.borderRadius = '8px';
    canvas.style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
    canvas.style.cursor = 'crosshair';
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    container.appendChild(canvas);
    if (renderingTaskRef.current) {
      try {
        renderingTaskRef.current.cancel();
      } catch {
        /* noop */
      }
    }
    renderingTaskRef.current = page.render({ canvasContext: ctx, viewport });
    await renderingTaskRef.current.promise;

    // Trích text trang.
    const tc = await page.getTextContent();
    currentPageTextRef.current = tc.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((it: any) => it.str)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Lớp text vô hình cho việc bôi đen.
    const textLayer = document.createElement('div');
    textLayer.style.cssText = `position:absolute;left:0;top:0;width:${viewport.width}px;height:${viewport.height}px;line-height:1;`;
    container.style.position = 'relative';
    for (const item of tc.items) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const it = item as any;
      const span = document.createElement('span');
      span.textContent = it.str;
      const tr = it.transform;
      span.style.cssText = `position:absolute;left:${tr[4]}px;top:${viewport.height - tr[5]}px;font-size:${tr[0]}px;color:transparent;white-space:pre;`;
      textLayer.appendChild(span);
    }
    container.appendChild(textLayer);
    textLayer.style.pointerEvents = 'auto';
    textLayer.style.userSelect = 'text';
    textLayer.addEventListener('mouseup', handleSelection);

    setFocusText('');
  }, [pdf, pageNum, handleSelection]);

  useEffect(() => {
    if (pdf) renderPage();
  }, [pdf, pageNum, renderPage]);

  // Ẩn popup khi bấm ra ngoài.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.('#sel-popup')) return;
      setSelPopup(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const lib = pdfjsRef.current;
    if (!lib) {
      setOutText('⚠ Chưa nạp được thư viện đọc PDF. Em kiểm tra mạng rồi thử lại nhé.');
      return;
    }
    const ab = await file.arrayBuffer();
    const doc = await lib.getDocument({ data: ab }).promise;
    setNumPages(doc.numPages);
    setPageNum(1);
    setPdf(doc);
  };

  const runAi = useCallback(
    async (focusOverride?: string) => {
      const pageText = currentPageTextRef.current;
      const focus = focusOverride ?? focusText;
      if (!pageText) {
        setOutText('Em mở 1 trang PDF trước nhé.');
        return;
      }
      setThinking(true);
      setQuiz(null);
      setAnswers({});

      if (tab === 'quiz') {
        setOutText('🤔 Đang soạn quiz từ trang này…');
        try {
          const res = await fetch('/api/ai/pdf-quiz', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              grade,
              subject,
              pageNumber: pageNum,
              pageText,
              numQuestions: 4,
            }),
          });
          const data = await res.json();
          setThinking(false);
          setQuiz(Array.isArray(data.questions) ? data.questions : []);
          setOutText('');
        } catch (err) {
          setThinking(false);
          setOutText('⚠ Lỗi: ' + (err as Error).message);
        }
        return;
      }

      setOutText('🤔 AI đang đọc trang ' + pageNum + '…');
      try {
        const res = await fetch('/api/ai/pdf-explain', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade,
            subject,
            bookSeries,
            pageNumber: pageNum,
            pageText,
            mode: focus ? 'deeper' : tab,
            focusText: focus || undefined,
          }),
        });
        const data = await res.json();
        setThinking(false);
        const reply = data.reply || '(không có phản hồi)';
        setOutText(reply);
        speak(reply);
      } catch (err) {
        setThinking(false);
        setOutText('⚠ Lỗi: ' + (err as Error).message);
      }
    },
    [tab, grade, subject, bookSeries, pageNum, focusText],
  );

  const askAboutSelection = () => {
    if (!selPopup) return;
    const text = selPopup.text;
    setFocusText(text);
    setSelPopup(null);
    runAi(text);
  };

  const answerQuiz = (qi: number, choice: number, correct: number) => {
    if (answers[qi] !== undefined) return;
    setAnswers((a) => ({ ...a, [qi]: choice }));
    try {
      fetch('/api/adaptive/event', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learner: learner(),
          skill: 'sgk-' + (subject || 'misc') + '-l' + (grade || '?'),
          correct: choice === correct,
          domain: 'school',
          context: 'pdf-page-' + pageNum,
        }),
      }).catch(() => {});
    } catch {
      /* noop */
    }
  };

  const runLabel = tab === 'quiz' ? '▶ Soạn quiz từ trang này' : '▶ Chạy AI cho trang này';

  return (
    <div className="pdftutor -mx-4 -my-6 flex min-h-[calc(100vh-64px)] flex-col text-white sm:-mx-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-slate-900/70 px-4 py-3 backdrop-blur">
        <Link
          href="/"
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white no-underline"
        >
          ←
        </Link>
        <h1 className="m-0 bg-gradient-to-br from-white via-amber-400 to-orange-500 bg-clip-text text-lg text-transparent">
          📖 PDF Tutor
        </h1>
        <div className="flex flex-wrap items-center gap-1.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={onFile}
            className="max-w-[190px] rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white file:mr-2 file:cursor-pointer file:rounded-md file:border-0 file:bg-gradient-to-br file:from-amber-400 file:to-orange-500 file:px-2.5 file:py-1 file:font-bold file:text-[#3e2723]"
          />
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            title="Lớp"
            className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          >
            {GRADES.map((g) => (
              <option key={g} value={g} className="text-black">
                {g}
              </option>
            ))}
          </select>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            title="Môn"
            className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          >
            {SUBJECTS.map(([v, l]) => (
              <option key={v} value={v} className="text-black">
                {l}
              </option>
            ))}
          </select>
          <select
            value={bookSeries}
            onChange={(e) => setBookSeries(e.target.value)}
            title="Bộ sách"
            className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          >
            {BOOK_SERIES.map(([v, l]) => (
              <option key={v || 'none'} value={v} className="text-black">
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs">
          <button
            onClick={() => pageNum > 1 && setPageNum((p) => p - 1)}
            className="rounded-lg border border-white/10 bg-white/[0.08] px-2.5 py-1.5 text-sm text-white"
          >
            ←
          </button>
          <div className="rounded-full bg-amber-400/15 px-3 py-1 font-semibold tabular-nums text-amber-400">
            {pdf ? `${pageNum} / ${numPages}` : '—'}
          </div>
          <button
            onClick={() => pdf && pageNum < numPages && setPageNum((p) => p + 1)}
            className="rounded-lg border border-white/10 bg-white/[0.08] px-2.5 py-1.5 text-sm text-white"
          >
            →
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid min-h-0 flex-1 gap-3 p-3 lg:grid-cols-[1fr_360px]">
        {/* PDF area */}
        <div className="flex min-h-[60vh] items-start justify-center overflow-auto rounded-2xl border border-white/10 bg-black/40 p-3">
          {!pdf && (
            <div className="max-w-[480px] px-5 py-16 text-center opacity-80">
              <h2 className="mb-2.5 text-[22px]">📖 Học từ SGK bằng AI Tutor</h2>
              <p className="text-sm leading-relaxed opacity-85">
                Mở file PDF SGK Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo của em. Mỗi trang
                sẽ có AI tutor giảng giải, cho ví dụ, soạn quiz nhanh — bằng tiếng Việt theo GDPT
                2018.
              </p>
              <p className="text-sm leading-relaxed opacity-85">
                <b>Mẹo:</b> Bôi đen 1 đoạn để hỏi sâu, AI sẽ tập trung vào đoạn đó.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 rounded-[10px] border-0 bg-gradient-to-br from-amber-400 to-orange-500 px-[18px] py-2.5 text-sm font-bold text-[#3e2723]"
              >
                📂 Chọn file PDF
              </button>
              <p className="mt-4 text-xs opacity-60">
                Không có sẵn PDF? Em có thể tải bản online của các bộ sách:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() =>
                    window.open(
                      'https://www.google.com/search?q=Toán+11+Kết+nối+tri+thức+PDF',
                      '_blank',
                    )
                  }
                  className="rounded-full border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 text-[11px] text-sky-300"
                >
                  Toán 11 KNTT
                </button>
                <button
                  onClick={() =>
                    window.open(
                      'https://www.google.com/search?q=Vật+lý+11+Cánh+Diều+PDF',
                      '_blank',
                    )
                  }
                  className="rounded-full border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 text-[11px] text-sky-300"
                >
                  Lý 11 CD
                </button>
                <button
                  onClick={() =>
                    window.open(
                      'https://www.google.com/search?q=Lịch+sử+10+Chân+Trời+PDF',
                      '_blank',
                    )
                  }
                  className="rounded-full border border-sky-500/30 bg-sky-500/15 px-3 py-1.5 text-[11px] text-sky-300"
                >
                  Sử 10 CTST
                </button>
              </div>
            </div>
          )}
          <div ref={pageContainerRef} />
        </div>

        {/* Panel */}
        <div className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.06]">
          <div className="flex gap-1 border-b border-white/10 p-1.5">
            {TABS.map(([t, label]) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  'flex-1 rounded-lg border border-transparent px-1.5 py-2 text-[11px] ' +
                  (tab === t
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-[#3e2723]'
                    : 'bg-transparent text-white')
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              <button
                onClick={() => runAi()}
                className="flex-auto rounded-full border border-sky-500/30 bg-sky-500/15 px-2.5 py-1.5 text-[11px] font-semibold text-sky-300 hover:bg-sky-500/30"
              >
                {runLabel}
              </button>
              <button
                onClick={() => speak(outText)}
                className="flex-auto rounded-full border border-sky-500/30 bg-sky-500/15 px-2.5 py-1.5 text-[11px] font-semibold text-sky-300 hover:bg-sky-500/30"
              >
                🔊 Đọc to
              </button>
              <button
                onClick={() => typeof speechSynthesis !== 'undefined' && speechSynthesis.cancel()}
                className="flex-auto rounded-full border border-sky-500/30 bg-sky-500/15 px-2.5 py-1.5 text-[11px] font-semibold text-sky-300 hover:bg-sky-500/30"
              >
                ⏹ Dừng
              </button>
            </div>

            {quiz !== null ? (
              <QuizView
                quiz={quiz}
                answers={answers}
                onAnswer={answerQuiz}
              />
            ) : (
              <div
                className={
                  'min-h-[100px] whitespace-pre-wrap rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-3 text-[13px] leading-relaxed ' +
                  (thinking ? 'italic opacity-60' : '')
                }
              >
                {outText}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Focus overlay */}
      {focusText && (
        <div className="fixed bottom-4 left-4 right-4 z-[100] max-w-[480px] rounded-xl border border-amber-400/50 bg-slate-900/95 px-3.5 py-2.5 text-xs backdrop-blur">
          <div className="mb-1 text-[11px] opacity-65">🎯 AI đang focus đoạn:</div>
          <div className="max-h-20 overflow-hidden leading-relaxed">
            {focusText.slice(0, 200) + (focusText.length > 200 ? '…' : '')}
          </div>
        </div>
      )}

      {/* Selection popup */}
      {selPopup && (
        <div
          id="sel-popup"
          onClick={askAboutSelection}
          style={{ left: selPopup.x, top: selPopup.y }}
          className="absolute z-[200] cursor-pointer rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-bold text-[#3e2723] shadow-lg"
        >
          🦉 Hỏi AI về đoạn này
        </div>
      )}
    </div>
  );
}

function QuizView({
  quiz,
  answers,
  onAnswer,
}: {
  quiz: QuizQ[];
  answers: Record<number, number>;
  onAnswer: (qi: number, choice: number, correct: number) => void;
}) {
  if (!quiz.length) {
    return (
      <div className="min-h-[100px] rounded-[10px] border border-white/[0.08] bg-white/[0.04] p-3 text-[13px] leading-relaxed">
        AI chưa soạn được quiz từ trang này. Em thử trang khác nhé.
      </div>
    );
  }
  return (
    <div>
      {quiz.map((q, i) => {
        const answered = answers[i] !== undefined;
        const chosen = answers[i];
        return (
          <div key={i} className="mb-2.5 rounded-[10px] bg-white/[0.04] p-3">
            <div className="mb-2 text-[13px] font-semibold leading-normal">
              {i + 1}. {q.stem}
            </div>
            {(q.options || []).map((opt, j) => {
              let cls = 'bg-white/5';
              if (answered) {
                if (j === q.correct) cls = 'bg-emerald-500/25 border-l-[3px] border-emerald-500';
                else if (j === chosen) cls = 'bg-red-500/25 border-l-[3px] border-red-500';
              }
              return (
                <div
                  key={j}
                  onClick={() => onAnswer(i, j, q.correct)}
                  className={
                    'my-1 cursor-pointer rounded-lg px-3 py-[7px] text-xs transition-colors hover:bg-white/10 ' +
                    cls
                  }
                >
                  {String.fromCharCode(65 + j)}. {opt}
                </div>
              );
            })}
            {answered && (
              <div className="mt-2 rounded-md bg-sky-500/10 p-2 text-xs opacity-85">
                💡 {q.explain || ''}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
