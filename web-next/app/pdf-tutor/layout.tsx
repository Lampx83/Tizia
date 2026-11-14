import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Gia sư PDF — Hỏi đáp trên tài liệu của bạn',
  description: 'Tải tài liệu PDF lên và hỏi đáp trực tiếp theo từng trang: tóm tắt, giải thích thuật ngữ và tạo câu hỏi ôn tập từ chính tài liệu đó.',
  path: '/pdf-tutor',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
