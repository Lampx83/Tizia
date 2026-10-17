'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Question = { text: string; options: string[]; correct: number };
type Quest = { title: string; description: string; questions: Question[] };

type GenResponse = {
  ok?: boolean;
  quest?: Quest;
  raw_count?: number;
  error?: string;
  detail?: string;
};

// Bám đúng option của trang gốc ai-quiz-gen.html
const GRADES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SUBJECTS = [
  { value: 'Toán', label: '📐 Toán' },
  { value: 'Tiếng Việt', label: '📚 Tiếng Việt' },
  { value: 'Tiếng Anh', label: '🇬🇧 Tiếng Anh' },
  { value: 'Khoa học', label: '🔬 Khoa học' },
  { value: 'Sử Địa', label: '🌏 Sử Địa' },
  { value: 'Tin học', label: '💻 Tin học' },
];
const SUBJECT_MAP: Record<string, string> = {
  Toán: 'toan',
  'Tiếng Việt': 'van',
  'Tiếng Anh': 'anh',
  'Khoa học': 'khoa-hoc',
  'Sử Địa': 'su-dia',
  'Tin học': 'tin-hoc',
};
const TOPIC_PRESETS: Record<string, string> = {
  driving: 'Tình huống lái xe an toàn theo luật giao thông VN',
};

type Msg = { kind: 'err' | 'ok'; node: React.ReactNode } | null;

const selectCls =
  'w-full rounded-[10px] border border-border bg-black/30 px-3.5 py-2.5 text-sm text-white focus:border-[#fbbf24] focus:outline-none';
const labelCls =
  'mb-1.5 mt-2.5 block text-[11px] font-bold uppercase tracking-wide text-muted-foreground';

export default function AiQuizGenClient() {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('2');
  const [subject, setSubject] = useState('Toán');
  const [count, setCount] = useState('5');
  const [difficulty, setDifficulty] = useState('medium');
  const [language, setLanguage] = useState('vi');

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);

  const [generated, setGenerated] = useState<Quest | null>(null);
  const [pTitle, setPTitle] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pubMsg, setPubMsg] = useState<Msg>(null);

  // Prefill từ URL — các landing (hoc-thong-minh, trường Lái xe) link tới đây
  // dạng /ai-quiz-gen?topic=...&grade=...&subject=...
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const t = qs.get('topic');
    if (t) setTopic(TOPIC_PRESETS[t] || t);
    const g = qs.get('grade');
    if (g && GRADES.includes(g)) setGrade(g);
    const s = qs.get('subject');
    if (s && SUBJECTS.some((x) => x.value === s)) setSubject(s);
  }, []);

  async function generate() {
    setMsg(null);
    const t = topic.trim();
    if (!t) {
      setMsg({ kind: 'err', node: 'Hãy nhập chủ đề' });
      return;
    }
    setLoading(true);
    try {
      const r = await fetch('/api/ai/quiz-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: t,
          grade,
          subject,
          count: Number(count),
          difficulty,
          language,
        }),
        credentials: 'same-origin',
      });
      const d = (await r.json()) as GenResponse;
      if (d.error) {
        setMsg({
          kind: 'err',
          node: `AI lỗi: ${d.error}${d.detail ? ' · ' + d.detail.slice(0, 200) : ''}`,
        });
        return;
      }
      if (!d.ok || !d.quest) {
        setMsg({ kind: 'err', node: 'Không nhận được kết quả' });
        return;
      }
      setGenerated(d.quest);
      setPTitle(d.quest.title);
      setPDesc(d.quest.description);
      setMsg({
        kind: 'ok',
        node: `✓ AI sinh xong ${d.quest.questions.length} câu (raw: ${d.raw_count})`,
      });
    } catch (e) {
      setMsg({ kind: 'err', node: `Lỗi mạng: ${(e as Error).message}` });
    } finally {
      setLoading(false);
    }
  }

  async function publish() {
    if (!generated) return;
    setPubMsg(null);
    const payload = {
      title: pTitle.trim(),
      description: pDesc.trim(),
      subject_tag: SUBJECT_MAP[subject] || 'khac',
      grade_tag: grade,
      questions: generated.questions,
    };
    try {
      const r = await fetch('/api/ugc/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      });
      const d = (await r.json()) as { ok?: boolean; error?: string };
      if (!r.ok) {
        setPubMsg({ kind: 'err', node: d.error || 'Lỗi' });
        return;
      }
      setPubMsg({
        kind: 'ok',
        node: (
          <>
            ✓ Đăng thành công!{' '}
            <a href="/ugc/index.html" className="text-[#fbbf24] underline">
              Xem trong marketplace →
            </a>
          </>
        ),
      });
    } catch (e) {
      setPubMsg({ kind: 'err', node: (e as Error).message });
    }
  }

  async function openLive() {
    if (!generated) return;
    setPubMsg(null);
    try {
      const r = await fetch('/api/live-quiz/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: pTitle.trim(),
          questions: generated.questions,
        }),
        credentials: 'same-origin',
      });
      const d = (await r.json()) as { pin?: string; error?: string };
      if (!r.ok) {
        setPubMsg({
          kind: 'err',
          node: `${d.error || 'Lỗi'}${d.error === 'teacher_only' ? ' (cần role GV/Admin)' : ''}`,
        });
        return;
      }
      window.location.href = `/live-quiz/host.html?pin=${d.pin}`;
    } catch (e) {
      setPubMsg({ kind: 'err', node: (e as Error).message });
    }
  }

  function MsgBox({ m }: { m: Msg }) {
    if (!m) return null;
    return (
      <div
        className={cn(
          'mt-3.5 rounded-[10px] px-3.5 py-2.5 text-[13px]',
          m.kind === 'err'
            ? 'border-l-[3px] border-[#fb7185] bg-[rgba(239,68,68,0.10)] text-[#fda4af]'
            : 'border-l-[3px] border-[#34d399] bg-[rgba(34,197,94,0.10)] text-[#86efac]',
        )}
      >
        {m.node}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3.5">
        <a
          href="/ugc/index.html"
          className="rounded-[18px] border border-border bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold"
        >
          ← Marketplace
        </a>
        <h1 className="text-lg font-semibold">🤖 AI Quiz Generator</h1>
      </div>

      {/* Panel sinh quest */}
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-2.5 text-[14px] uppercase tracking-wide text-muted-foreground">
            🪄 Sinh quest tự động
          </h3>

          <label className={labelCls}>Chủ đề (rõ ràng càng tốt)</label>
          <Input
            maxLength={200}
            placeholder="VD: Phép cộng 2 chữ số có nhớ trong phạm vi 100"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className={labelCls}>Lớp</label>
              <select className={selectCls} value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="">— Tất cả —</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    Lớp {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Môn</label>
              <select
                className={selectCls}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">— Chọn —</option>
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Số câu (3-15)</label>
              <Input
                type="number"
                min={3}
                max={15}
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={labelCls}>Độ khó</label>
              <select
                className={selectCls}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Ngôn ngữ</label>
              <select
                className={selectCls}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>
          </div>

          <Button
            className="mt-3.5 w-full bg-gradient-to-br from-[#a78bfa] to-[#6366f1] font-extrabold text-white hover:opacity-90"
            disabled={loading}
            onClick={generate}
          >
            {loading ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-[2.5px] border-white/20 border-t-white align-middle" />
                AI đang suy nghĩ…
              </>
            ) : (
              '🪄 Sinh quest bằng AI'
            )}
          </Button>

          <MsgBox m={msg} />
        </CardContent>
      </Card>

      {/* Panel xem trước */}
      {generated && (
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-2.5 text-[14px] uppercase tracking-wide text-muted-foreground">
              👀 Xem trước
            </h3>
            <Input
              maxLength={100}
              placeholder="Tiêu đề"
              className="mb-2 text-base font-extrabold"
              value={pTitle}
              onChange={(e) => setPTitle(e.target.value)}
            />
            <textarea
              rows={2}
              maxLength={500}
              placeholder="Mô tả"
              className="w-full rounded-[10px] border border-border bg-black/30 px-3.5 py-2.5 text-sm text-white focus:border-[#fbbf24] focus:outline-none"
              value={pDesc}
              onChange={(e) => setPDesc(e.target.value)}
            />

            <div className="mt-3">
              {generated.questions.map((q, i) => (
                <div
                  key={i}
                  className="mb-2.5 rounded-xl border border-border bg-white/[0.04] p-3.5"
                >
                  <div className="mb-1.5 text-[11px] text-muted-foreground">Câu {i + 1}</div>
                  <div className="mb-2 font-bold">{q.text}</div>
                  {q.options.map((o, j) => (
                    <div
                      key={j}
                      className={cn(
                        'my-1 block rounded-lg px-2.5 py-1.5 text-[13px]',
                        j === q.correct
                          ? 'bg-[rgba(34,197,94,0.18)] font-bold text-[#34d399]'
                          : 'bg-white/[0.03]',
                      )}
                    >
                      {String.fromCharCode(65 + j)}. {o} {j === q.correct ? '✓' : ''}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <Button
                className="bg-gradient-to-br from-[#34d399] to-[#10b981] font-extrabold text-[#052e16] hover:opacity-90"
                onClick={publish}
              >
                📢 Đăng vào Marketplace
              </Button>
              <Button
                className="bg-gradient-to-br from-[#fbbf24] to-[#f97316] font-extrabold text-[#1e293b] hover:opacity-90"
                onClick={openLive}
              >
                🎤 Mở Live Quiz
              </Button>
            </div>

            <MsgBox m={pubMsg} />
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Cần đăng nhập để sinh và đăng quest.{' '}
        <Link href="/login" className="text-primary hover:underline">
          Đăng nhập →
        </Link>
      </p>
    </div>
  );
}
