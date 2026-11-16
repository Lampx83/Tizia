import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Pixel Art Studio — Vẽ tranh pixel 16×16 và 32×32',
  description: 'Xưởng vẽ pixel art trên trình duyệt: bảng 16 màu, lưới 16×16 hoặc 32×32, lưu tác phẩm ngay trên máy và tải về.',
  path: '/pixel-art-studio',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
