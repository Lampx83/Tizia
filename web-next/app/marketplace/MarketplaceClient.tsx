'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type Lesson = {
  slug: string;
  title: string;
  description: string | null;
  author: string | null;
  grade: string | null;
  subject: string | null;
  views: number;
  likes: number;
  created_at: number;
  updated_at: number;
};

const SUBJECTS: { value: string; label: string }[] = [
  { value: '', label: 'Tất cả môn' },
  { value: 'toan', label: 'Toán' },
  { value: 'vat_ly', label: 'Vật lý' },
  { value: 'hoa', label: 'Hoá' },
  { value: 'sinh', label: 'Sinh' },
  { value: 'ngu_van', label: 'Ngữ văn' },
  { value: 'lich_su', label: 'Lịch sử' },
  { value: 'dia', label: 'Địa lí' },
  { value: 'tin_hoc', label: 'Tin học' },
  { value: 'duoc', label: 'Dược' },
  { value: 'y', label: 'Y khoa' },
];

const GRADES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const SORTS: { value: string; label: string }[] = [
  { value: 'recent', label: 'Mới nhất' },
  { value: 'likes', label: '❤️ Nhiều thích' },
  { value: 'views', label: '👁 Nhiều xem' },
];

function formatTime(t: number) {
  return new Date(t).toLocaleDateString('vi-VN');
}

const selectClass =
  'rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

export default function MarketplaceClient({ initialItems }: { initialItems: Lesson[] }) {
  const [items, setItems] = useState<Lesson[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [sort, setSort] = useState('recent');
  // Bỏ qua lần fetch đầu vì đã có dữ liệu SSR.
  const firstRun = useRef(true);
  const debTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ q, subject, grade, sort, limit: '60' });
    try {
      const r = await fetch('/api/lessons?' + params.toString(), { credentials: 'same-origin' });
      const d: { items?: Lesson[] } = await r.json();
      setItems(d.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [q, subject, grade, sort]);

  // Debounce khi gõ tìm kiếm; đổi filter/sort thì load ngay.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (debTimer.current) clearTimeout(debTimer.current);
    debTimer.current = setTimeout(load, 300);
    return () => {
      if (debTimer.current) clearTimeout(debTimer.current);
    };
  }, [q, subject, grade, sort, load]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-border bg-card p-4">
        <Input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm theo tên, mô tả…"
          className="min-w-[180px] flex-1"
        />
        <select className={selectClass} value={subject} onChange={(e) => setSubject(e.target.value)}>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select className={selectClass} value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="">Tất cả lớp</option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              Lớp {g}
            </option>
          ))}
        </select>
        <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value)}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <Button type="button" variant="secondary" onClick={load} disabled={loading}>
          🔄
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          {loading ? (
            <p>Đang tải…</p>
          ) : (
            <>
              <p>Chưa có bài giảng nào phù hợp.</p>
              <a
                href="/lesson-builder"
                className="mt-4 inline-block rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 px-6 py-3 font-bold text-[#3e2723]"
              >
                ✏️ Tạo bài giảng đầu tiên
              </a>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {items.map((l) => {
            const desc = (l.description || '').slice(0, 140);
            const truncated = (l.description || '').length > 140;
            return (
              <a key={l.slug} href={`/lesson?slug=${encodeURIComponent(l.slug)}`}>
                <Card className="h-full transition-colors hover:border-primary">
                  <CardContent className="p-4">
                    <h3 className="mb-1.5 text-base font-semibold">{l.title}</h3>
                    <div className="mb-2 text-xs text-muted-foreground">
                      👤 {l.author || 'Ẩn danh'} · {formatTime(l.created_at)}
                    </div>
                    <p className="mb-3 min-h-[60px] text-sm leading-relaxed text-muted-foreground">
                      {desc}
                      {truncated ? '…' : ''}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {l.subject && <Badge variant="secondary">{l.subject}</Badge>}
                      {l.grade && <Badge variant="secondary">Lớp {l.grade}</Badge>}
                    </div>
                    <div className="mt-3 flex gap-3 border-t border-border pt-2.5 text-xs text-muted-foreground">
                      <span>👁 {l.views}</span>
                      <span>❤️ {l.likes}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
