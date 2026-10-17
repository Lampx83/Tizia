import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import OsceChampionship, { type OsceExam } from './OsceChampionship';

export const metadata: Metadata = pageMeta({
  title: 'OSCE Championship',
  description:
    'Kỳ thi OSCE Composite tốt nghiệp Dược — 10 trạm nối tiếp (đọc đơn, tư vấn BN, tính liều, sắp xếp bước, viết SOAP, roleplay) có đồng hồ đếm ngược từng trạm và chứng chỉ.',
  path: '/GC07-osce-championship',
});

// Đề OSCE lấy từ DB qua /api/content/osce-exam (collection 'osce-exam', items[0]).
type Res = { ok: boolean; collection: string; items: OsceExam[] };

export default async function GC07OsceChampionship() {
  const res = await tiziaFetch<Res>('/api/content/osce-exam');

  if (!res.ok && res.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để tham gia kỳ thi OSCE tốt nghiệp.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  const exam = res.data?.items?.[0] ?? null;

  if (!exam || !Array.isArray(exam.stations) || exam.stations.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Chưa có dữ liệu đề OSCE. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return <OsceChampionship exam={exam} />;
}
