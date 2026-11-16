import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Trò chuyện với Agent AI — Trợ giảng ảo',
  description: 'Hỏi đáp trực tiếp với các agent AI đã cài trên Tizia: trợ giảng môn học, hướng dẫn thực hành, tra cứu tài liệu. Trả lời theo luồng thời gian thực.',
  path: '/agent-chat',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
