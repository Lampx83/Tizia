import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import QuizMount from './QuizMount';

export const metadata: Metadata = pageMeta({
  title: 'Sắc ký Quiz · 10 câu',
  description:
    'Quiz sắc ký lớp mỏng (TLC): 10 câu định tính, công thức Rf, quy trình, ứng dụng dược. Có timer, streak, điểm thưởng tốc độ.',
  path: '/sac-ky-quiz',
});

// Server Component: khung SEO tĩnh (tiêu đề) render sẵn. Toàn bộ tương tác (bộ
// câu hỏi, timer, chấm điểm, streak, modal kết quả, submit /api/attempts) nằm
// trong QuizMount ('use client'), tái dùng script vanilla qua
// public/legacy/sac-ky-quiz.js — giữ nguyên hành vi bản HTML gốc.
export default function SacKyQuiz() {
  return <QuizMount />;
}
