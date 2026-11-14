import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = privateMeta(
  'Bảng điều khiển học tập',
  'Theo dõi tiến độ học, chuỗi ngày học, nhiệm vụ hằng ngày và gợi ý bài tiếp theo của riêng bạn.',
  '/dashboard',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
