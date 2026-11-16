import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Máy tính pha loãng C₁V₁ = C₂V₂ — Có minh hoạ và bài tự kiểm',
  description: 'Tính nồng độ và thể tích khi pha loãng dung dịch theo công thức C₁V₁ = C₂V₂, kèm hình minh hoạ trực quan và câu hỏi tự kiểm ngẫu nhiên.',
  path: '/dilution',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
