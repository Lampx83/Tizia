import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import SubjectPath, { type Chapter } from './SubjectPath';

export const metadata: Metadata = pageMeta({
  title: 'Lộ trình môn học — Chương, bài và Boss cuối chương',
  description:
    'Lộ trình học từng môn theo chương → bài. Mỗi bài là một nhiệm vụ ngắn, mở khoá tuần tự và có Boss kiểm tra cuối chương.',
  path: '/subject',
});

// /api/content/:collection → { ok, collection, items }. Public (guest xem được).
type ContentRes = { ok: boolean; collection: string; items: Chapter[] };

export default async function SubjectPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; grade?: string }>;
}) {
  const sp = await searchParams;
  const subject = sp.subject || 'toan';
  const grade = sp.grade || '6';

  // Trường dùng để nút "← Lộ trình trường" — giữ như trang gốc (secondary).
  const backSchool = '/school?domain=secondary';

  // Hiện tại chỉ có lộ trình Toán 6 — giống trang gốc.
  if (!(subject === 'toan' && grade === '6')) {
    return (
      <div className="w-full space-y-4">
        <TopNav backSchool={backSchool} />
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">⏳ Lộ trình đang được xây dựng</h2>
          <p className="mt-2 text-muted-foreground">
            Môn này sẽ sớm có hệ thống chương → bài như Toán lớp 6.
          </p>
          <p className="mt-3">
            <a href={backSchool} className="text-primary hover:underline">
              ← Quay lại lộ trình trường
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Chương Toán 6 từ DB (/api/content/math6-chapters) — SSR cho SEO.
  const res = await tiziaFetch<ContentRes>('/api/content/math6-chapters');
  const chapters: Chapter[] = res.data?.items || [];

  return (
    <div className="w-full">
      <TopNav backSchool={backSchool} />
      <SubjectPath chapters={chapters} />
    </div>
  );
}

function TopNav({ backSchool }: { backSchool: string }) {
  return (
    <div className="mb-4 flex gap-3 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        ← Trang chủ
      </Link>
      <span className="opacity-40">·</span>
      <a href={backSchool} className="hover:text-foreground">
        🗺️ Lộ trình trường
      </a>
    </div>
  );
}
