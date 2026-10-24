import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Phản Xạ Cầu Thủ — Giáo dục thể chất Lớp 2',
  description: 'Trò chơi luyện phản xạ và hiểu biết thể thao cho học sinh Lớp 2, gắn với môn Giáo dục thể chất theo chương trình GDPT 2018.',
  path: '/lop2-the-thao',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
