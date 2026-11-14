import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

// Trang này là Client Component nên KHÔNG tự export được metadata.
// Layout bọc ngoài giữ phần SEO (title, description, canonical, thẻ chia sẻ).
export const metadata: Metadata = pageMeta({
  title: 'Patient Simulation — Hỏi bệnh với bệnh nhân ảo Việt Nam',
  description: 'Hỏi bệnh và tư vấn cho bệnh nhân ảo dựa trên ca lâm sàng Việt Nam, đối thoại tự nhiên bằng AI và được chấm theo tiêu chí lâm sàng.',
  path: '/patient-sim',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
