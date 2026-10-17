import Link from 'next/link';
import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import FamilyClient, { type FamilyMe } from './FamilyClient';

export const metadata: Metadata = privateMeta(
  'Gia đình',
  'Quản lý gia đình Tizia — liên kết tài khoản con, chia sẻ gói cước, theo dõi tiến độ học tập.',
  '/family',
);


export default async function FamilyPage() {
  const res = await tiziaFetch<FamilyMe>('/api/family/me');

  // Gate: 401 → mời đăng nhập (bản gốc redirect sang login).
  if (res.status === 401 || !res.data) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để quản lý gia đình của bạn.</p>
        <Link
          href="/login?return=%2Ffamily"
          className="mt-2 inline-block font-medium text-primary hover:underline"
        >
          Đăng nhập →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 py-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">👨‍👩‍👧 Gia đình</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Link tài khoản con (Học sinh) với tài khoản của bạn để chia sẻ gói cước.
        </p>
      </div>

      <FamilyClient initial={res.data} />
    </div>
  );
}
