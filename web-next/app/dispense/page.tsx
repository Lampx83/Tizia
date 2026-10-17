import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import DispenseClient from './dispense-client';

// Trang mô phỏng cấp phát thuốc "5 Đúng" (quiz 2 pha + canvas lọ thuốc).
// Server component chỉ giữ metadata SEO; toàn bộ tương tác (đếm viên, vẽ lọ,
// kiểm nhãn) nằm ở client component.
export const metadata: Metadata = pageMeta({
  title: 'Cấp phát thuốc · 5 Đúng',
  description:
    'Mô phỏng cấp phát thuốc GPP: tính đúng số viên + kiểm "5 Đúng" trước khi giao để chặn sai sót thuốc.',
  path: '/dispense',
});

export default function DispensePage() {
  return <DispenseClient />;
}
