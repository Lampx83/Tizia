import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Lop2AnhMemoryClient from './lop2-anh-memory-client';

// Trang game lật thẻ ghi nhớ từ vựng tiếng Anh lớp 2 (game loop client). Server
// component chỉ giữ metadata SEO; toàn bộ tương tác (lật thẻ, ghép cặp, timer,
// score, sync XP) nằm ở client component. Bộ thẻ fetch từ DB /api/content/lop2-anh-memory.
export const metadata: Metadata = pageMeta({
  title: '🎴 Memory Match — Tiếng Anh Lớp 2',
  description:
    'Trò chơi lật thẻ ghép cặp tiếng Anh ↔ tiếng Việt cho học sinh lớp 2.',
  path: '/lop2-anh-memory',
});

export default function Lop2AnhMemoryPage() {
  return <Lop2AnhMemoryClient />;
}
