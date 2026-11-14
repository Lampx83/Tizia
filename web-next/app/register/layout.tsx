import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Đăng ký tài khoản miễn phí',
  description: 'Tạo tài khoản Tizia miễn phí để học Mầm non và Tiểu học không mất phí, lưu tiến độ và tham gia bảng xếp hạng.',
  path: '/register',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
