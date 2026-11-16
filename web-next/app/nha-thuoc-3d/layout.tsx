import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Nhà thuốc GPP 3D — Thực hành bán thuốc với 165 dược phẩm',
  description: 'Mô phỏng nhà thuốc đạt GPP bằng 3D: tra cứu 165 thuốc thật trên kệ, tư vấn và bán thuốc theo đơn, thực hành kỹ năng giao tiếp của dược sĩ nhà thuốc.',
  path: '/nha-thuoc-3d',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
