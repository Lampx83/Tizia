import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import BpMeasure from './BpMeasure';

export const metadata: Metadata = pageMeta({
  title: 'Đo huyết áp · Korotkoff',
  description:
    'Mô phỏng đo huyết áp bằng phương pháp Korotkoff: bơm bao đo, xả từ từ, nghe tiếng đập để xác định tâm thu / tâm trương.',
  path: '/bp-measure',
});

export default function BpMeasurePage() {
  return <BpMeasure />;
}
