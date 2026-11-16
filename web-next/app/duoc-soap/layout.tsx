import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'SOAP Writer Studio — Viết bệnh án SOAP dược lâm sàng',
  description: 'Chọn ca lâm sàng thật rồi luyện viết ghi chép SOAP (Subjective, Objective, Assessment, Plan) theo chuẩn dược lâm sàng, có nhận xét tự động.',
  path: '/duoc-soap',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
