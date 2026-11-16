import Link from 'next/link';
import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import TeacherClient, { type ClassSummary } from './teacher-client';
import { PageHeader } from '@/components/ui/page-header';
import { buttonVariants } from '@/components/ui/button';

// noindex — trang quản lý lớp riêng của giảng viên.
export const metadata: Metadata = privateMeta(
  'Quản lý lớp · Giảng viên',
  'Tạo lớp, phát mã mời cho sinh viên và theo dõi tiến độ học của cả lớp.',
  '/teacher',
);


export default async function TeacherPage() {
  // SSR: fetch danh sách lớp lần đầu để có nội dung sẵn khi tải trang.
  const res = await tiziaFetch<ClassSummary[]>('/api/classes');

  if (res.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để quản lý lớp của bạn.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  const initialClasses = Array.isArray(res.data) ? res.data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        icon="👨‍🏫"
        title="Quản lý lớp"
        description="Tạo lớp · phát mã mời cho sinh viên · theo dõi tiến độ"
        actions={
          <>
            {[
              ['/teacher-live', '🔴 Live Quiz'],
              ['/lesson-builder', '🧩 Soạn bài'],
              ['/dashboard', '📊 Dashboard tổng'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                {label}
              </Link>
            ))}
          </>
        }
      />

      <TeacherClient initialClasses={initialClasses} />
    </div>
  );
}
