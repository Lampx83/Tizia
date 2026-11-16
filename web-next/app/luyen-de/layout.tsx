import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Luyện đề thi thử — Tốt nghiệp THPT và thi vào lớp 10',
  description: 'Làm đề thi thử trực tuyến có bấm giờ: tốt nghiệp THPT (Toán, Ngữ văn, Tiếng Anh, GDKT&PL) và thi vào lớp 10, chấm điểm ngay kèm lời giải từng câu.',
  path: '/luyen-de',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
