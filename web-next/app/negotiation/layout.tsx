import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Mô phỏng đàm phán — Lý thuyết trò chơi ứng dụng',
  description: 'Nhập vai đàm phán theo tình huống kinh doanh: ra giá, nhượng bộ, tìm điểm cân bằng và xem phân tích theo lý thuyết trò chơi.',
  path: '/negotiation',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
