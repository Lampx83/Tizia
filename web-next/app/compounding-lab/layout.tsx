import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Phòng bào chế 3D — Pha chế thuốc theo công thức',
  description: 'Thực hành bào chế thuốc trong phòng thí nghiệm 3D: đọc công thức, thao tác từng bước theo quy trình và kiểm chất lượng thành phẩm.',
  path: '/compounding-lab',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
