'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type PenaltyEntry = {
  subject: string;
  conduct: string;
  amount: string;
  consequence?: string;
  legalBasis: string;
};

type PenaltyInfo = {
  summary: string;
  entries: PenaltyEntry[];
  aggravatedEntries?: PenaltyEntry[];
  note?: string;
  noIndependentPenalty?: boolean;
  verifiedOn: string;
  sourceLabel: string;
  sourceUrl: string;
};

// Shape 1 biển — giống item collection 'gplx-bien-bao' backend trả về.
export type BienBaoItem = {
  id: string;
  code: string;
  group: 'cam' | 'hieu-lenh' | 'chi-dan' | 'phu';
  groupLabel: string;
  name: string;
  image: string | null;
  meaning?: string;
  rule?: string;
  penalty?: PenaltyInfo;
};

const GROUPS: { value: 'all' | BienBaoItem['group']; label: string }[] = [
  { value: 'all', label: '📚 Tất cả' },
  { value: 'cam', label: '⛔ Biển cấm' },
  { value: 'hieu-lenh', label: '🔵 Biển hiệu lệnh' },
  { value: 'chi-dan', label: '🟦 Biển chỉ dẫn' },
  { value: 'phu', label: '➖ Biển phụ' },
];

function PenaltyEntryRow({ entry }: { entry: PenaltyEntry }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/30">
      <p className="font-semibold text-amber-900 dark:text-amber-200">{entry.subject}</p>
      <p className="mt-0.5 text-amber-950/80 dark:text-amber-100/80">{entry.amount}</p>
      {entry.consequence && (
        <p className="mt-0.5 text-xs text-amber-900/70 dark:text-amber-200/70">{entry.consequence}</p>
      )}
      <p className="mt-1 text-xs text-amber-900/60 dark:text-amber-200/60">Căn cứ: {entry.legalBasis}</p>
    </div>
  );
}

function DetailPanel({ item, onClose }: { item: BienBaoItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-background p-5 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="secondary">{item.groupLabel}</Badge>
            <h2 className="mt-1 text-lg font-bold">{item.code} — {item.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border px-2.5 py-1 text-sm text-muted-foreground hover:bg-muted"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        {item.image && (
          <div className="mt-4 flex justify-center">
            {/* Ảnh gốc kích thước biến thiên theo nguồn nhập — dùng <img> thay vì next/image
                để tránh phải khai báo width/height cố định sai tỉ lệ cho từng biển. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.name} className="h-40 w-40 object-contain" />
          </div>
        )}

        {item.meaning && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-foreground">Ý nghĩa</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.meaning}</p>
          </div>
        )}
        {item.rule && (
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-foreground">Quy định</h3>
            <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{item.rule}</p>
          </div>
        )}

        {item.penalty && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-semibold text-foreground">⚖️ Mức xử phạt vi phạm</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.penalty.summary}</p>
            {item.penalty.noIndependentPenalty ? null : (
              <div className="mt-2 space-y-2">
                {item.penalty.entries.map((entry, i) => (
                  <PenaltyEntryRow key={i} entry={entry} />
                ))}
              </div>
            )}
            {item.penalty.note && (
              <p className="mt-2 text-xs italic text-muted-foreground">{item.penalty.note}</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Nguồn: {item.penalty.sourceUrl ? (
                <a href={item.penalty.sourceUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                  {item.penalty.sourceLabel}
                </a>
              ) : item.penalty.sourceLabel}
              {' '}· đối chiếu {item.penalty.verifiedOn}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Đố vui nhận diện biển báo — sinh câu hỏi trắc nghiệm động từ danh mục,
// không cần ngân hàng câu hỏi cố định như /luat-giao-thong-600. ──────────────
type QuizQMode = 'name' | 'group' | 'meaning';
type QuizQuestion = {
  item: BienBaoItem;
  qMode: QuizQMode;
  prompt: string;
  options: string[];
  correctIndex: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_LEN = 10;

function buildQuiz(pool: BienBaoItem[]): QuizQuestion[] {
  const picked = shuffle(pool).slice(0, Math.min(QUIZ_LEN, pool.length));
  return picked.map((item) => {
    // Câu hỏi ý nghĩa chỉ dùng được cho nhóm cấm (có field meaning).
    const qMode: QuizQMode = item.meaning && Math.random() < 0.34
      ? 'meaning'
      : Math.random() < 0.5 ? 'name' : 'group';
    const distractors = shuffle(pool.filter((s) => s.id !== item.id));

    if (qMode === 'group') {
      const wrongGroups = shuffle(
        Array.from(new Set(pool.map((s) => s.groupLabel).filter((g) => g !== item.groupLabel))),
      ).slice(0, 3);
      const options = shuffle([item.groupLabel, ...wrongGroups]);
      return {
        item, qMode,
        prompt: `Biển "${item.name}" thuộc nhóm nào?`,
        options,
        correctIndex: options.indexOf(item.groupLabel),
      };
    }
    if (qMode === 'meaning' && item.meaning) {
      const wrongMeanings = distractors.filter((s) => s.meaning).slice(0, 3).map((s) => s.meaning as string);
      const options = shuffle([item.meaning, ...wrongMeanings]);
      return {
        item, qMode,
        prompt: `Ý nghĩa của biển ${item.code} — "${item.name}" là gì?`,
        options,
        correctIndex: options.indexOf(item.meaning),
      };
    }
    const wrongNames = distractors.slice(0, 3).map((s) => s.name);
    const options = shuffle([item.name, ...wrongNames]);
    return {
      item, qMode: 'name',
      prompt: 'Biển báo này tên là gì?',
      options,
      correctIndex: options.indexOf(item.name),
    };
  });
}

function QuizPractice({ pool }: { pool: BienBaoItem[] }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildQuiz(pool));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const restart = () => {
    setQuestions(buildQuiz(pool));
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (pool.length < 4) {
    return (
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Cần ít nhất 4 biển trong bộ lọc hiện tại để tạo câu hỏi — hãy chọn nhóm khác hoặc bỏ tìm kiếm.
      </p>
    );
  }

  if (done) {
    return (
      <div className="mt-8 text-center">
        <p className="text-3xl">🎯</p>
        <p className="mt-2 text-lg font-semibold">
          Đúng {score}/{questions.length} câu
        </p>
        <button
          onClick={restart}
          className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          🔁 Làm lại 10 câu khác
        </button>
      </div>
    );
  }

  const q = questions[idx];
  const answered = picked !== null;

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-xs text-muted-foreground">
        Câu {idx + 1}/{questions.length} · Điểm: {score}
      </p>
      <Card className="mt-2">
        <CardContent className="p-4">
          {q.item.image && (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={q.item.image} alt="Biển báo" className="h-28 w-28 object-contain" />
            </div>
          )}
          <p className="mt-3 text-center font-medium">{q.prompt}</p>
          <div className="mt-4 space-y-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isPicked = i === picked;
              const cls = !answered
                ? 'border-input hover:bg-muted'
                : isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  : isPicked
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                    : 'border-input opacity-60';
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${cls}`}
                >
                  {opt}
                  {answered && isCorrect ? ' ✓' : answered && isPicked ? ' ✗' : ''}
                </button>
              );
            })}
          </div>
          {answered && (
            <button
              onClick={next}
              className="mt-4 w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {idx + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function BienBaoCatalog({ items }: { items: BienBaoItem[] }) {
  const [view, setView] = useState<'catalog' | 'quiz'>('catalog');
  const [group, setGroup] = useState<'all' | BienBaoItem['group']>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<BienBaoItem | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const it of items) c[it.group] = (c[it.group] || 0) + 1;
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((it) => {
      if (group !== 'all' && it.group !== group) return false;
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        it.code.toLowerCase().includes(q) ||
        (it.meaning || '').toLowerCase().includes(q)
      );
    });
  }, [items, group, search]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">🚸 Tra cứu biển báo giao thông (GPLX)</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Danh mục {items.length} biển báo theo QCVN 41:2019/BGTVT — bấm vào 1 biển để xem ý nghĩa,
        quy định{group === 'cam' || group === 'all' ? ' và mức phạt vi phạm' : ''}.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Tìm bài luyện theo câu hỏi trắc nghiệm? Xem{' '}
        <Link href="/luat-giao-thong-600" className="text-primary hover:underline">
          600 câu lý thuyết lái xe →
        </Link>
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setView('catalog')}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            view === 'catalog'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input bg-background text-foreground hover:bg-muted'
          }`}
        >
          📖 Tra cứu
        </button>
        <button
          onClick={() => setView('quiz')}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            view === 'quiz'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input bg-background text-foreground hover:bg-muted'
          }`}
        >
          🎯 Đố vui nhận diện
        </button>
      </div>

      {view === 'catalog' && (
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc mã biển, vd: cấm rẽ trái, P.123a…"
          className="mt-4"
        />
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g.value}
            onClick={() => setGroup(g.value)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              group === g.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background text-foreground hover:bg-muted'
            }`}
          >
            {g.label} <span className="opacity-70">({counts[g.value] ?? 0})</span>
          </button>
        ))}
      </div>

      {view === 'quiz' ? (
        <QuizPractice key={group} pool={group === 'all' ? items : items.filter((it) => it.group === group)} />
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Không tìm thấy biển báo phù hợp.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((it) => (
            <Card
              key={it.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setSelected(it)}
            >
              <CardContent className="flex flex-col items-center gap-2 p-3 text-center">
                {it.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.image} alt={it.name} className="h-16 w-16 object-contain" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                    {it.code}
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{it.code}</p>
                  <p className="line-clamp-2 text-sm font-medium">{it.name}</p>
                </div>
                {it.penalty && <Badge variant="destructive" className="text-[10px]">Có mức phạt</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {view === 'catalog' && selected && <DetailPanel item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
