import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: '2D Arcade — Xếp thuốc lên kệ bằng cử chỉ tay',
  description: 'Game arcade 2D nhận diện cử chỉ tay (MediaPipe): véo ngón để kéo hộp thuốc lên đúng kệ theo nhóm điều trị. Luyện nhớ nhóm thuốc cho sinh viên Dược.',
  path: '/2d-arcade',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
