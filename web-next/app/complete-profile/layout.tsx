import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = privateMeta(
  'Hoàn tất hồ sơ học tập',
  'Bổ sung cấp học, khối lớp và thông tin cần thiết để Tizia gợi ý đúng nội dung cho bạn.',
  '/complete-profile',
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
