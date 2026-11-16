import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Cửa hàng skin & avatar — Đổi xu lấy vật phẩm',
  description: 'Dùng xu kiếm được khi học để đổi skin, avatar và vật phẩm trang trí cho hồ sơ học tập trên Tizia.',
  path: '/cua-hang',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
