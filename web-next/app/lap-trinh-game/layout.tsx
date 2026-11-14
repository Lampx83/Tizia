import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Lập trình game — Viết mã điều khiển nhân vật qua màn',
  description: 'Học lập trình bằng cách viết mã điều khiển nhân vật vượt qua từng màn chơi, xem kết quả chạy ngay trên canvas.',
  path: '/lap-trinh-game',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
