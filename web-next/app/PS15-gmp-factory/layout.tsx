import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Tham quan nhà máy GMP 3D — 4 phòng sạch',
  description: 'Tour nhà máy dược phẩm đạt GMP bằng 3D: đi qua 4 cấp phòng sạch (ISO class), quan sát dây chuyền sản xuất và quy tắc kiểm soát nhiễm chéo.',
  path: '/PS15-gmp-factory',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
