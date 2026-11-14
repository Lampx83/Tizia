import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import GhepChuCaiClient from './ghep-chu-cai-client';

// Trang trò chơi tương tác (nhận diện chữ cái, client). Server component chỉ giữ
// metadata SEO; toàn bộ tương tác nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: '🔤 Ghép Chữ Cái',
  description:
    'Bé tap đúng chữ cái cô đưa ra. Trò chơi nhận diện bảng chữ cái A-Á-Â cho 3-5 tuổi.',
  path: '/ghep-chu-cai',
});

export default function GhepChuCaiPage() {
  return <GhepChuCaiClient />;
}
