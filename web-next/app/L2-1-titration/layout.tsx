import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Chuẩn độ acid–base 3D — Thí nghiệm ảo Hoá phân tích',
  description: 'Phòng thí nghiệm ảo chuẩn độ acid–base: nhỏ giọt buret, theo dõi pH thời gian thực và dựng đường cong chuẩn độ. Bài L2-1 của trường Dược Tizia.',
  path: '/L2-1-titration',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
