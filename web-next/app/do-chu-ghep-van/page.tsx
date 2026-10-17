import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import DoChuGhepVanClient from './do-chu-ghep-van-client';

// Trang trò chơi tương tác (kéo thả client). Server component chỉ giữ metadata
// SEO; toàn bộ tương tác nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: '🔤 Đố Chữ Ghép Vần',
  description:
    'Trò chơi ghép âm tiết Tiếng Việt — kéo các chữ cái vào ô để tạo từ theo nghĩa được gợi ý. Dành cho lớp 1-3.',
  path: '/do-chu-ghep-van',
});

export default function DoChuGhepVanPage() {
  return <DoChuGhepVanClient />;
}
