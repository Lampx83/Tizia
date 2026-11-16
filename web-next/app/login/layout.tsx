import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Đăng nhập',
  description: 'Đăng nhập Tizia để tiếp tục lộ trình học, giữ tiến độ, chuỗi ngày học và điểm thưởng của bạn.',
  path: '/login',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
