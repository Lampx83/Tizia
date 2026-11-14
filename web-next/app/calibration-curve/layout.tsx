import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Đường chuẩn UV-Vis — Định luật Beer–Lambert',
  description: 'Dựng đường chuẩn UV-Vis bằng hồi quy tuyến tính bình phương tối thiểu, nội suy nồng độ mẫu chưa biết và tự kiểm tra bằng câu hỏi ngắn.',
  path: '/calibration-curve',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
