import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Khuôn viên đa người chơi — Học cùng bạn trong không gian 2.5D',
  description: 'Vào khuôn viên trường ảo cùng lúc với bạn học: di chuyển nhân vật, trò chuyện thời gian thực và rủ nhau vào phòng học, phòng thí nghiệm.',
  path: '/campus-mp',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
