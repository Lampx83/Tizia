import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import ItAlgoVizClient from './it-algo-viz-client';

// Trang trực quan giải thuật sắp xếp (canvas 2D) + củng cố MCQ. Toàn bộ tương
// tác chạy client (canvas loop, state). Server component chỉ giữ metadata SEO.
export const metadata: Metadata = pageMeta({
  title: '🌳 Trực quan giải thuật · Trường CNTT',
  description:
    'Xem từng bước so sánh & hoán đổi của Bubble/Selection/Insertion/Merge/Quick sort trên canvas 2D, kèm câu hỏi củng cố kiến thức.',
  path: '/it-algo-viz',
});

export default function ItAlgoVizPage() {
  return <ItAlgoVizClient />;
}
