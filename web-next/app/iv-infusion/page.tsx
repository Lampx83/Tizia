import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import IvInfusion from './IvInfusion';

export const metadata: Metadata = pageMeta({
  title: 'Tốc độ truyền dịch · IV Rate',
  description:
    'Mô phỏng truyền dịch tĩnh mạch: tính mL/giờ và số giọt/phút theo thể tích, thời gian và bộ dây truyền, kèm câu hỏi tự kiểm.',
  path: '/iv-infusion',
});

export default function IvInfusionPage() {
  return <IvInfusion />;
}
