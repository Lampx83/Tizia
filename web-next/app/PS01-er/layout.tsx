import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Cấp cứu phản vệ (ER) 3D — Mô phỏng ca lâm sàng',
  description: 'Mô phỏng phòng cấp cứu 3D: xử trí sốc phản vệ theo phác đồ, theo dõi sinh hiệu trực tiếp và ghi nhật ký quyết định lâm sàng.',
  path: '/PS01-er',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
