import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import HocThongMinhClient from './HocThongMinhClient';

export const metadata: Metadata = pageMeta({
  title: '🧠 Học thông minh',
  description:
    'Học theo lộ trình AI — Tizia chọn câu hỏi phù hợp độ khó cho em (adaptive IRT) + đề xuất kỹ năng kế tiếp dựa trên knowledge graph.',
  path: '/hoc-thong-minh',
});

export default function HocThongMinhPage() {
  return <HocThongMinhClient />;
}
