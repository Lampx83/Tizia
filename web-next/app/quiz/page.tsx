import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import QuizClient from './quiz-client';

// Trang quiz tương tác (timer + chấm điểm ở client). Server component chỉ giữ
// metadata SEO; toàn bộ tương tác + nạp câu hỏi nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: 'Quiz nhanh — Kiểm tra kiến thức trong vài phút',
  description:
    'Làm bài quiz ngắn theo môn và khối lớp, chấm điểm ngay và xem giải thích cho từng câu.',
  path: '/quiz',
});

export default function QuizPage() {
  return <QuizClient />;
}
