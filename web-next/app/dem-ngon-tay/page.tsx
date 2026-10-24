import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import DemNgonTayClient from './dem-ngon-tay-client';

// Trang trò chơi tương tác (game loop client). Server component chỉ giữ metadata
// SEO; toàn bộ tương tác (đếm ngón, chọn số, TTS, confetti) nằm ở client component.
export const metadata: Metadata = pageMeta({
  title: '✋ Đếm Ngón Tay',
  description:
    'Bé nhìn bàn tay giơ X ngón rồi tap số đúng. Trò chơi đếm 1-10 cho 3-5 tuổi.',
  path: '/dem-ngon-tay',
});

export default function DemNgonTayPage() {
  return <DemNgonTayClient />;
}
