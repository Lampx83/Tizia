import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import SrsClient, { type Deck, type Stats } from './srs-client';

export const metadata: Metadata = pageMeta({
  title: '🃏 Flashcards SRS',
  description:
    'Ôn từ vựng, công thức, ngày tháng theo phương pháp Spaced Repetition — học hiệu quả như Anki.',
  path: '/srs',
});

type StatsRes = { ok: boolean } & Partial<Stats>;
type DecksRes = { items?: Deck[] };

export default async function SrsPage() {
  // SSR fetch song song: stats (cần auth) + decks (công khai).
  const [statsRes, decksRes] = await Promise.all([
    tiziaFetch<StatsRes>('/api/srs/stats'),
    tiziaFetch<DecksRes>('/api/srs/decks'),
  ]);

  if (statsRes.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  const stats: Stats = {
    total: statsRes.data?.total ?? 0,
    due_now: statsRes.data?.due_now ?? 0,
    reviews: statsRes.data?.reviews ?? 0,
    avg_ease: statsRes.data?.avg_ease ?? 0,
  };
  const decks: Deck[] = decksRes.data?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">🃏 Flashcards SRS</h1>
      </div>
      <SrsClient initialStats={stats} initialDecks={decks} />
    </div>
  );
}
