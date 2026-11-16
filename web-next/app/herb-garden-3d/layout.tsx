import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Vườn dược liệu 3D — Nhận diện cây thuốc Việt Nam',
  description: 'Dạo vườn dược liệu 3D: quan sát cây thuốc Việt Nam, tra bộ phận dùng, công dụng và nhóm hoạt chất ngay trong không gian ba chiều.',
  path: '/herb-garden-3d',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
