import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import BossArena from './boss-arena';

export const metadata: Metadata = pageMeta({
  title: '⚔ Trận đấu kiến thức',
  description:
    'Hạ boss bằng câu trả lời đúng — combat-by-quiz Tizia. Mỗi boss thử thách 1 chủ đề + drop coin/XP/skin.',
  path: '/tran-dau',
});

export default function TranDau() {
  return (
    <div className="space-y-6 pb-16">
      <div className="mx-auto max-w-[600px] px-4 pt-8 pb-2 text-center">
        <h1
          className="m-0 text-2xl font-extrabold"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #ef4444)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Hạ boss bằng câu trả lời đúng!
        </h1>
        <p className="m-0 mt-1.5 text-sm text-muted-foreground">
          Mỗi boss = 1 chủ đề. Trả lời đúng → boss mất HP. Sai → em mất hearts. Drop coin/XP/skin khi thắng.
        </p>
      </div>

      <BossArena />
    </div>
  );
}
