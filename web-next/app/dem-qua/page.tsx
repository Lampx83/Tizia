import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import DemQuaClient from './dem-qua-client';

// Trang trò chơi tương tác (game loop client). Server component chỉ giữ metadata
// SEO; toàn bộ tương tác nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: '🍎 Đếm Quả Trên Cây',
  description:
    'Bé tap đúng số quả táo cô yêu cầu. Game đếm số đơn giản cho 3-5 tuổi.',
  path: '/dem-qua',
});

export default function DemQuaPage() {
  return <DemQuaClient />;
}
