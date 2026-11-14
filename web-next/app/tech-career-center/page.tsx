import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import CareerCenterMount from './CareerCenterMount';

// Server Component: khung SEO tĩnh render sẵn. Phần tương tác (AI Career Coach
// quiz, cẩm nang vị trí, case study, 3 mini-game nhập vai dev/tester/security,
// lộ trình + cây kỹ năng req #37, lưu tiến độ localStorage + best-effort cộng XP)
// nằm trong CareerCenterMount ('use client'), tái dùng script vanilla qua
// public/legacy/tech-career-center.js — giữ NGUYÊN hành vi + text tiếng Việt của
// bản public/tech-career-center.html gốc.
export const metadata: Metadata = pageMeta({
  title: '🚀 Trung tâm Hướng nghiệp & Giả lập Công nghệ',
  description:
    'Tech Career Center: định hướng nghề CNTT bằng AI quiz, cẩm nang vị trí công việc, case study, và nhập vai thực tập tại công ty giả lập VinaApp (lập trình viên, kiểm thử, bảo mật).',
  path: '/tech-career-center',
});

export default function TechCareerCenter() {
  return <CareerCenterMount />;
}
