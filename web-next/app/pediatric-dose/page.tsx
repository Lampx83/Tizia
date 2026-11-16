import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import PediatricDose from './PediatricDose';

export const metadata: Metadata = pageMeta({
  title: 'Máy tính liều Nhi · Pediatric Dosing',
  description:
    'Tính liều siro nhi khoa theo cân nặng: liều mg/kg, thể tích cần hút, giới hạn tối đa/ngày, kèm quiz tự kiểm luyện tính nhanh.',
  path: '/pediatric-dose',
});

export default function PediatricDosePage() {
  return <PediatricDose />;
}
