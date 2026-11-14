import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Kháng sinh đồ Kirby–Bauer — Thực hành đọc vòng vô khuẩn',
  description: 'Mô phỏng kỹ thuật kháng sinh đồ khuếch tán đĩa (Kirby–Bauer): đặt khoanh giấy kháng sinh, đo đường kính vòng vô khuẩn và luận giải nhạy/trung gian/kháng.',
  path: '/antibiogram-2d',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
