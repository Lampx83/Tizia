import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Luyện phát âm Tiếng Anh — Chấm điểm bằng giọng nói',
  description: 'Đọc to câu tiếng Anh theo ba mức độ, hệ thống nghe và chấm điểm phát âm để bạn sửa ngay từng âm sai.',
  path: '/luyen-phat-am',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
