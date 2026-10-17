import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Bài giảng — Nội dung bài học',
  description: 'Trang bài giảng của Tizia: lý thuyết, hình ảnh minh hoạ và hoạt động tương tác cho từng bài trong lộ trình môn học.',
  path: '/lesson',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
