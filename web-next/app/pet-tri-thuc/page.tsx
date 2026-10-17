import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import PetClient from './pet-client';

export const metadata: Metadata = pageMeta({
  title: '🐣 Pet Tri Thức',
  description:
    'Nuôi Tiziamon — sinh vật ảo lớn lên theo kiến thức của em. Trả lời quiz để cho ăn, học, chơi cùng pet!',
  path: '/pet-tri-thuc',
});

export default function PetTriThucPage() {
  return <PetClient />;
}
