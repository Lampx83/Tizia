import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Phân Loại Rác — Hoạt động trải nghiệm Lớp 2',
  description: 'Trò chơi phân loại rác hữu cơ, tái chế và rác còn lại cho học sinh Lớp 2, bám hoạt động trải nghiệm trong chương trình GDPT 2018.',
  path: '/lop2-phan-loai-rac',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
