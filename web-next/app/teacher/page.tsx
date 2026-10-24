import Link from 'next/link';
import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import TeacherClient, { type ClassSummary } from './teacher-client';

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
      <header className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">👨‍🏫 Quản lý lớp</h1>
        <span className="text-sm text-muted-foreground">
          Tạo lớp · phát mã mời cho SV · theo dõi tiến độ
        </span>
        <span className="ml-auto flex flex-wrap gap-2 text-xs">
          <Link href="/teacher-live" className="rounded-md bg-card px-3 py-1.5 text-foreground hover:bg-card/80">
            🔴 Live Quiz
          </Link>
          <Link href="/lesson-builder" className="rounded-md bg-card px-3 py-1.5 text-foreground hover:bg-card/80">
            🧩 Soạn bài
          </Link>
          <Link href="/dashboard" className="rounded-md bg-card px-3 py-1.5 text-foreground hover:bg-card/80">
            📊 Dashboard tổng
          </Link>
          <Link href="/" className="rounded-md bg-card px-3 py-1.5 text-foreground hover:bg-card/80">
            ← Trang chính
          </Link>
        </span>
      </header>

      <TeacherClient initialClasses={initialClasses} />
    </div>
  );
}
