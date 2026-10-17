import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Sắc ký lớp mỏng TLC 2D — Mô phỏng chấm và khai triển bản mỏng',
  description: 'Mô phỏng sắc ký lớp mỏng (TLC) 2D: chấm mẫu, chọn hệ dung môi, khai triển bản mỏng và tính giá trị Rf.',
  path: '/sac-ky-2d',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
