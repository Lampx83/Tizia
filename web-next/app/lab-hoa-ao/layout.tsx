import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Lab Hoá Học Ảo — Kéo thả hoá chất xem phản ứng',
  description: 'Phòng thí nghiệm hoá học ảo cho học sinh: kéo hai hoá chất vào nhau để xem phản ứng, dự đoán kết quả, ghi sổ tay và mở khoá huy hiệu.',
  path: '/lab-hoa-ao',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
