import type { Metadata } from 'next';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import BienBaoCatalog, { type BienBaoItem } from './BienBaoCatalog';

export const metadata: Metadata = {
  title: '🚸 Tra cứu biển báo GPLX — Danh mục 235 biển · Tizia',
  description:
    'Tra cứu đầy đủ biển báo giao thông theo QCVN 41:2019/BGTVT (cấm, hiệu lệnh, chỉ dẫn, phụ) — nhóm biển cấm kèm mức phạt theo Nghị định 168/2024/NĐ-CP.',
};

type Res = { ok: boolean; collection: string; items: BienBaoItem[] };

export default async function TraCuuBienBaoGplx() {
  const res = await tiziaFetch<Res>('/api/content/gplx-bien-bao');
  const items = res.data?.items ?? [];

  if (!res.ok && res.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để tra cứu biển báo giao thông.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  return <BienBaoCatalog items={items} />;
}
