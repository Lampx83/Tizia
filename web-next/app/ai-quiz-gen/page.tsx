import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import AiQuizGenClient from './AiQuizGenClient';

export const metadata: Metadata = pageMeta({
  title: '🤖 AI Quiz Generator',
  description:
    'Sinh quest trắc nghiệm bằng AI — chỉ cần nhập chủ đề + lớp. Xem trước, chỉnh sửa, đăng vào marketplace.',
  path: '/ai-quiz-gen',
});

export default function AiQuizGenPage() {
  return <AiQuizGenClient />;
}
