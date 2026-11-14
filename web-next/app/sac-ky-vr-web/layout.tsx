import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Sắc ký VR — Thí nghiệm thực tế ảo trên trình duyệt',
  description: 'Trải nghiệm thí nghiệm sắc ký bằng thực tế ảo ngay trên trình duyệt (WebXR), thao tác bằng tay cầm hoặc chuột nếu không có kính VR.',
  path: '/sac-ky-vr-web',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
