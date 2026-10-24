'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type Stats = {
  total: number;
  due_now: number;
  reviews: number;
  avg_ease: number;
};

export type Deck = {
  id: number;
  name: string;
  card_count: number;
  subject_tag?: string | null;
  grade_tag?: string | null;
  creator_name?: string | null;
};

type Card = {
  card_key: string;
  front?: string | null;
  back?: string | null;
  hint?: string | null;
  isNew?: boolean;
};

export default function SrsClient({
  initialStats,
  initialDecks,
}: {
  initialStats: Stats;
  initialDecks: Deck[];
}) {
  const [stats, setStats] = useState<Stats>(initialStats);
  const [decks, setDecks] = useState<Deck[]>(initialDecks);

  // Trạng thái phiên ôn.
  const [queue, setQueue] = useState<Card[] | null>(null); // null = đang ở màn chủ
  const [cur, setCur] = useState(0);
  const [flipped, setFlipped] = useState(false);

  async function refreshHome() {
    try {
      const [sr, dr] = await Promise.all([
        fetch('/api/srs/stats', { credentials: 'same-origin' }),
        fetch('/api/srs/decks', { credentials: 'same-origin' }),
      ]);
      if (sr.ok) {
        const s = await sr.json();
        setStats({
          total: s.total ?? 0,
          due_now: s.due_now ?? 0,
          reviews: s.reviews ?? 0,
          avg_ease: s.avg_ease ?? 0,
        });
      }
      if (dr.ok) {
        const d = await dr.json();
        setDecks(d.items ?? []);
      }
    } catch {
      /* giữ nguyên trạng thái hiện tại */
    }
  }

  async function startReview(deckId: number | null) {
    try {
      const url = '/api/srs/queue?limit=20' + (deckId ? '&deck_id=' + deckId : '');
      const r = await fetch(url, { credentials: 'same-origin' });
      const d = await r.json();
      const q: Card[] = d.queue || [];
      if (q.length === 0) {
        alert('Không có card nào đến hạn ôn — quay lại sau!');
        return;
      }
      setQueue(q);
      setCur(0);
      setFlipped(false);
    } catch (e) {
      alert('Lỗi: ' + (e as Error).message);
    }
  }

  async function review(quality: number) {
    if (!queue) return;
    const c = queue[cur];
    try {
      await fetch('/api/srs/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_key: c.card_key, quality }),
        credentials: 'same-origin',
      });
    } catch {
      /* bỏ qua lỗi ghi review, vẫn sang card tiếp */
    }
    setCur((n) => n + 1);
    setFlipped(false);
  }

  async function createDeck() {
    const name = prompt('Tên deck (vd: "100 từ vựng Anh lớp 5")');
    if (!name) return;
    const raw = prompt(
      'Nhập các card, mỗi dòng "front | back":\n\nVD:\nhello | xin chào\ngoodbye | tạm biệt',
    );
    if (!raw) return;
    const cards = raw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [front, back] = l.split('|').map((s) => s?.trim());
        return { front, back };
      })
      .filter((c) => c.front && c.back);
    if (cards.length === 0) {
      alert('Không có card hợp lệ');
      return;
    }
    try {
      const r = await fetch('/api/srs/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, cards }),
        credentials: 'same-origin',
      });
      const d = await r.json();
      if (!d.ok) {
        alert(d.error || 'Lỗi');
        return;
      }
      alert(`✓ Tạo deck với ${cards.length} card`);
      refreshHome();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  // ===== Màn phiên ôn =====
  if (queue) {
    // Hoàn thành phiên.
    if (cur >= queue.length) {
      return (
        <div className="rounded-2xl border border-border bg-card px-5 py-10 text-center">
          <div className="text-6xl">🎉</div>
          <h2 className="mt-3.5 mb-1.5 text-xl font-semibold text-emerald-400">
            Hoàn thành phiên ôn!
          </h2>
          <p className="text-muted-foreground">
            Bạn vừa ôn {queue.length} card. Quay lại sau để giữ độ ghi nhớ.
          </p>
          <button
            onClick={() => {
              setQueue(null);
              setCur(0);
              setFlipped(false);
              refreshHome();
            }}
            className="mx-auto mt-4 block rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 px-7 py-3 text-sm font-extrabold text-slate-800 shadow-lg shadow-orange-500/30"
          >
            ↻ Về trang chủ
          </button>
        </div>
      );
    }

    const c = queue[cur];
    const pct = Math.round((cur / queue.length) * 100);

    return (
      <div>
        {/* Thanh tiến độ */}
        <div className="mb-3.5 h-1.5 overflow-hidden rounded bg-white/[.06]">
          <i
            className="block h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-[width] duration-400"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mb-2 text-center text-xs text-muted-foreground">
          Card {cur + 1} / {queue.length}
        </div>

        {/* Thẻ lật */}
        <div className="my-7" style={{ perspective: '1200px', height: 340 }}>
          <div
            onClick={() => setFlipped(true)}
            className="relative h-full w-full cursor-pointer transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)',
              transform: flipped ? 'rotateY(180deg)' : undefined,
            }}
          >
            {/* Mặt trước */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-card p-8 text-center shadow-2xl shadow-black/40"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute left-[18px] top-3.5 text-[10.5px] font-extrabold uppercase tracking-[1.2px] text-muted-foreground">
                {c.isNew ? '🌱 MỚI' : '🔁 ÔN LẠI'}
              </div>
              <div className="max-w-full text-[28px] font-bold leading-[1.4]">
                {c.front || c.card_key}
              </div>
              {c.hint ? (
                <div className="mt-3.5 text-[13px] italic text-muted-foreground">{c.hint}</div>
              ) : null}
            </div>

            {/* Mặt sau */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-emerald-400/35 bg-card p-8 text-center shadow-2xl shadow-black/40"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="absolute left-[18px] top-3.5 text-[10.5px] font-extrabold uppercase tracking-[1.2px] text-muted-foreground">
                ĐÁP ÁN
              </div>
              <div className="max-w-full text-[28px] font-bold leading-[1.4] text-emerald-400">
                {c.back || '(no back)'}
              </div>
            </div>
          </div>
        </div>

        {!flipped ? (
          <button
            onClick={() => setFlipped(true)}
            className="mx-auto block rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 px-7 py-3 text-sm font-extrabold text-slate-800 shadow-lg shadow-orange-500/30"
          >
            🔍 Hiện đáp án
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            <GradeButton
              onClick={() => review(0)}
              className="bg-rose-400 text-white"
              label="Lại"
              desc="< 1 phút"
            />
            <GradeButton
              onClick={() => review(1)}
              className="bg-orange-400 text-slate-800"
              label="Khó"
              desc="1-2 ngày"
            />
            <GradeButton
              onClick={() => review(2)}
              className="bg-emerald-400 text-emerald-950"
              label="Tốt"
              desc="3-7 ngày"
            />
            <GradeButton
              onClick={() => review(3)}
              className="bg-cyan-500 text-white"
              label="Dễ"
              desc="2 tuần+"
            />
          </div>
        )}
      </div>
    );
  }

  // ===== Màn chủ (deck picker + stats) =====
  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <StatCard value={String(stats.total || 0)} label="Tổng card" />
        <StatCard value={String(stats.due_now || 0)} label="Đến hạn ôn" valueClass="text-rose-400" />
        <StatCard value={String(stats.reviews || 0)} label="Lần ôn" />
        <StatCard value={(stats.avg_ease || 0).toFixed(2)} label="EF TB" />
      </div>

      {stats.due_now > 0 && (
        <button
          onClick={() => startReview(null)}
          className="mb-5 w-full rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 px-7 py-4.5 text-base font-extrabold text-slate-800 shadow-lg shadow-orange-500/30"
          style={{ paddingTop: 18, paddingBottom: 18 }}
        >
          🔁 Ôn {stats.due_now} card đến hạn
        </button>
      )}

      <button
        onClick={createDeck}
        className="mb-[18px] block w-full cursor-pointer rounded-2xl border border-dashed border-primary/40 bg-primary/[.08] p-3.5 text-center font-bold text-primary transition-colors hover:bg-primary/[.16]"
      >
        + Tạo deck nhanh
      </button>

      <h3 className="mb-3 mt-6 text-[13px] uppercase tracking-[.6px] text-muted-foreground">
        📚 Decks công khai
      </h3>
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
        {decks.length === 0 ? (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            Chưa có deck nào — tự tạo đầu tiên!
          </div>
        ) : (
          decks.map((d) => (
            <button
              key={d.id}
              onClick={() => startReview(d.id)}
              className="rounded-2xl border border-border bg-card p-3.5 text-left transition-transform duration-150 hover:-translate-y-0.5 hover:border-primary"
            >
              <div className="mb-1 text-[14.5px] font-extrabold">{d.name}</div>
              <div className="text-xs text-muted-foreground">
                {d.card_count} card · {d.subject_tag || ''}{' '}
                {d.grade_tag ? '· Lớp ' + d.grade_tag : ''}
                <br />by {d.creator_name || '?'}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  valueClass,
}: {
  value: string;
  label: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center">
      <div className={cn('text-2xl font-extrabold text-primary', valueClass)}>{value}</div>
      <div className="text-[10.5px] uppercase tracking-[.5px] text-muted-foreground">{label}</div>
    </div>
  );
}

function GradeButton({
  onClick,
  className,
  label,
  desc,
}: {
  onClick: () => void;
  className: string;
  label: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-2xl px-2 py-3.5 text-[13px] font-extrabold transition-transform hover:-translate-y-0.5',
        className,
      )}
    >
      {label}
      <small className="mt-0.5 block text-[10px] font-semibold opacity-70">{desc}</small>
    </button>
  );
}
