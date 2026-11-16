import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Time Attack — Xếp thuốc đúng nhóm trước khi hết giờ',
  description: 'Game tính giờ cho sinh viên Dược: xếp hộp thuốc lên kệ đúng nhóm điều trị qua từng đợt, trả lời sai bị trừ thời gian.',
  path: '/time-attack',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
