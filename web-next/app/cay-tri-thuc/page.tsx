import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import TreeClient, { type ScenarioRuns, type Wallet } from './tree-client';

export const metadata: Metadata = pageMeta({
  title: '🌳 Cây Tri Thức',
  description:
    'Mỗi tuần em hoàn thành = 1 chiếc lá lên Cây Tri Thức. Cùng nuôi cây xanh tốt nhé!',
  path: '/cay-tri-thuc',
});

export default async function CayTriThuc() {
  // Cả /api/scenario-runs và /api/wallet đều requireAuth. Chưa đăng nhập → mời login.
  const [runsRes, walletRes] = await Promise.all([
    tiziaFetch<ScenarioRuns>('/api/scenario-runs'),
    tiziaFetch<Wallet>('/api/wallet'),
  ]);

  if (runsRes.status === 401 || walletRes.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để xem Cây Tri Thức của em.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  const runs: ScenarioRuns = runsRes.data || {};
  const wallet: Wallet = walletRes.data || { xp: 0, coins: 0, streak: 0 };

  return (
    <div className="space-y-4">
      <TreeClient runs={runs} wallet={wallet} />
    </div>
  );
}
