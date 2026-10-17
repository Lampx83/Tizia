import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Thư viện Asset 3D — Kho mô hình dùng cho bài giảng',
  description: 'Xem trước và tải các mô hình 3D (.glb/.gltf) dùng trong phòng thí nghiệm ảo, khuôn viên trường và trò chơi học tập của Tizia.',
  path: '/assets',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
