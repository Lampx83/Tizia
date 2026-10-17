import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import BaoSoHocClient from './bao-so-hoc-client';

// Trang trò chơi tương tác (game loop client). Server component chỉ để giữ
// metadata SEO; toàn bộ tương tác nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: '⛈️ Bão Số Học',
  description:
    'Phép tính rơi xuống như mưa — chọn đáp án nhanh trước khi chạm đất. Trò chơi luyện tính nhẩm vui nhộn.',
  path: '/bao-so-hoc',
});

export default function BaoSoHocPage() {
  return <BaoSoHocClient />;
}
