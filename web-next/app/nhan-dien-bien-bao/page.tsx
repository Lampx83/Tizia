import type { Metadata } from 'next';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import RecognizePanel, { type CatalogItem } from './RecognizePanel';

export const metadata: Metadata = {
  title: '📷 Nhận diện biển báo bằng AI — Camera/ảnh · Tizia',
  description:
    'Chụp ảnh hoặc tải ảnh biển báo giao thông lên, AI (YOLOv8) nhận diện ngay trên trình duyệt — không gửi ảnh lên máy chủ.',
};

type Res = { ok: boolean; collection: string; items: CatalogItem[] };

export default async function NhanDienBienBao() {
  const res = await tiziaFetch<Res>('/api/content/gplx-bien-bao');
  const items = res.data?.items ?? [];

  if (!res.ok && res.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để dùng tính năng nhận diện biển báo.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  return <RecognizePanel catalog={items} />;
}
