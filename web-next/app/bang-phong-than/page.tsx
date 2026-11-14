import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Leaderboard from './leaderboard';

export const metadata: Metadata = pageMeta({
  title: '🏆 Bảng Phong Thần',
  description:
    'Bảng xếp hạng cao thủ Tizia — top học sinh giỏi nhất theo tuần, tháng, mọi thời gian.',
  path: '/bang-phong-than',
});

// Server Component: chỉ dựng khung tĩnh (hero + link) cho SEO; toàn bộ dữ liệu
// leaderboard được gộp client-side qua nhiều version giống trang gốc.
export default function BangPhongThanPage() {
  return <Leaderboard />;
}
