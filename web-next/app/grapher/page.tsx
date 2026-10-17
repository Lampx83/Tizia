import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import GrapherClient from './grapher-client';

export const metadata: Metadata = pageMeta({
  title: '📈 Đồ thị hàm số',
  description:
    'Kéo hệ số, xem đồ thị hàm bậc nhất / bậc hai / lượng giác đổi ngay trên canvas — kèm phần củng cố.',
  path: '/grapher',
});

export default function GrapherPage() {
  return <GrapherClient />;
}
