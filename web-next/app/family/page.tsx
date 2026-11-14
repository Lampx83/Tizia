import type { Metadata } from 'next';
import { privateMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import FamilyClient, { type FamilyMe } from './FamilyClient';
import { LoginRequired } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';

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
      <LoginRequired className="my-12" returnTo="/family" description="Đăng nhập để quản lý gia đình và chia sẻ gói học với con." />
    );
  }

  return (
    <div className="w-full space-y-4 py-2">
      <PageHeader icon="👨‍👩‍👧" title="Gia đình" description="Liên kết tài khoản của con (học sinh) với tài khoản của bạn để chia sẻ gói học." />

      <FamilyClient initial={res.data} />
    </div>
  );
}
