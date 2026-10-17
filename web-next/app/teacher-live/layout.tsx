import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = privateMeta(
  'Lớp học trực tiếp — Khu giáo viên',
  'Điều khiển phiên học trực tiếp: chiếu câu hỏi, theo dõi câu trả lời của lớp theo thời gian thực.',
  '/teacher-live',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
