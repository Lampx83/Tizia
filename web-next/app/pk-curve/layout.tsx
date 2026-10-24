import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Đường cong dược động học PK/TDM — Mô hình một ngăn',
  description: 'Vẽ đường cong nồng độ thuốc theo thời gian (mô hình một ngăn, IV bolus, đa liều), chỉnh liều và khoảng cách liều để hiểu tích luỹ và trạng thái ổn định.',
  path: '/pk-curve',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
