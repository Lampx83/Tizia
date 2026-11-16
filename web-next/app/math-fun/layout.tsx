import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Toán vui — Game luyện toán Lớp 2 và Lớp 6',
  description: 'Trò chơi luyện toán bám chương trình GDPT 2018: chế độ Lớp 2 (cộng trừ, bảng nhân) và Lớp 6 (số nguyên, phân số, hình học), chơi là học.',
  path: '/math-fun',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
