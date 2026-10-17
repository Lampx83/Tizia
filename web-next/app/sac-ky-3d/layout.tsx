import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Sắc ký lớp mỏng TLC 3D — Thực hành trong phòng thí nghiệm ảo',
  description: 'Thực hành sắc ký lớp mỏng trong phòng thí nghiệm 3D: thao tác dụng cụ đúng thứ tự, khai triển bản mỏng và đọc kết quả Rf.',
  path: '/sac-ky-3d',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
