import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = privateMeta(
  'Trình soạn bài giảng',
  'Công cụ dành cho giáo viên: soạn bài giảng, chèn hoạt động tương tác và giao cho lớp.',
  '/lesson-builder',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
