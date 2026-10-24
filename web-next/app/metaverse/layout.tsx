import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Metaverse — Không gian học tập ba chiều',
  description: 'Bước vào không gian học tập metaverse của Tizia: di chuyển tự do, tương tác với vật thể và mở các hoạt động học ngay trong cảnh 3D.',
  path: '/metaverse',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
