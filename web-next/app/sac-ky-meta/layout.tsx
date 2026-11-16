import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Sắc ký Metaverse — Thí nghiệm nhóm nhiều người',
  description: 'Cùng bạn học vào phòng thí nghiệm sắc ký trong metaverse: chia vai, thao tác chung một bộ dụng cụ và trao đổi thời gian thực.',
  path: '/sac-ky-meta',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
