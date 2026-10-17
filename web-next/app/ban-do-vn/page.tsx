import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import MapClient, { type Province } from './MapClient';

export const metadata: Metadata = pageMeta({
  title: '🗺️ Bản đồ Việt Nam Tri Thức',
  description:
    'Khám phá 34 tỉnh thành Việt Nam (sau sáp nhập 2025) — mỗi tỉnh một câu chuyện, một mini quiz.',
  path: '/ban-do-vn',
});

type Res = { ok: boolean; collection: string; items: Province[] };

export default async function BanDoVN() {
  const res = await tiziaFetch<Res>('/api/content/provinces');
  const provinces: Province[] = res.data?.items || [];

  return <MapClient provinces={provinces} />;
}
