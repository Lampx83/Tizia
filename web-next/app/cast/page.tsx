import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import CastView from './CastView';

export const metadata: Metadata = pageMeta({
  title: 'Cast trình chiếu',
  description:
    'Chiếu nội dung Tizia lên máy chiếu lớp — view sạch, không nút điều khiển, có mã phòng và đồng hồ.',
  path: '/cast',
});

// Toàn bộ hành vi (đọc query, iframe, timer, picker) là client-side y như bản gốc.
export default function CastPage() {
  return <CastView />;
}
