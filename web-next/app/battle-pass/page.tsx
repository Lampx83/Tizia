import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PremiumButton, ClaimButton } from './Interactive';

export const metadata: Metadata = pageMeta({
  title: '🎖 Battle Pass',
  description:
    'Battle Pass mùa 2 tháng — 30 tier reward. Học để leo tier, mở khoá skin pet, frame avatar, emoji pack.',
  path: '/battle-pass',
});

type Reward = { coin: number; xp: number; item: string | null; claimed: boolean };
type Tier = { tier: number; unlocked: boolean; free: Reward; premium: Reward };
type BpMe = {
  ok: boolean;
  error?: string;
  season: { code: string; name: string; theme: string; ends_at: number; days_left: number };
  progress: {
    season_xp: number;
    tier: number;
    max_tier: number;
    xp_to_next: number;
    has_premium: boolean;
  };
  tiers: Tier[];
};

export default async function BattlePass() {
  const res = await tiziaFetch<BpMe>('/api/bp/me');

  if (res.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  const d = res.data;
  if (!d?.ok) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        {d?.error || 'Không có mùa hiện tại.'}
      </div>
    );
  }

  const xpPct = Math.min(100, Math.round((d.progress.season_xp / (30 * 500)) * 100));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">🎖 Battle Pass</h1>
      </div>

      {/* Season card */}
      <Card className="overflow-hidden border-primary/40 bg-gradient-to-br from-primary/20 to-amber-400/10">
        <CardContent className="flex flex-wrap items-center gap-5 p-5">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-radial from-amber-400/80 to-indigo-500/40 text-4xl shadow-lg shadow-indigo-500/40">
            🌌
          </div>
          <div className="min-w-[200px] flex-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Mùa giải hiện tại
            </div>
            <div className="my-1 bg-gradient-to-br from-amber-400 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
              {d.season.name}
            </div>
            <div className="mb-1.5 text-sm text-muted-foreground">
              Còn {d.season.days_left} ngày · Tier {d.progress.tier}/{d.progress.max_tier} · Season XP{' '}
              <b className="text-amber-400">{d.progress.season_xp}</b>
            </div>
            <div className="h-2.5 overflow-hidden rounded-lg bg-black/40">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-purple-400 transition-all"
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Tổng tiến độ</span>
              <span>
                <b className="text-amber-400">{d.progress.season_xp}</b> / {d.progress.max_tier * 500} XP
              </span>
            </div>
          </div>
          <PremiumButton hasPremium={d.progress.has_premium} />
        </CardContent>
      </Card>

      {/* Tier grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
        {d.tiers.map((t) => (
          <div
            key={t.tier}
            className={
              'rounded-2xl border bg-card p-3 text-center transition-transform hover:-translate-y-0.5' +
              (t.unlocked ? ' border-purple-400 shadow-md shadow-purple-400/15' : '')
            }
          >
            <div
              className={
                'mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold ' +
                (t.unlocked ? 'bg-purple-400 text-white' : 'bg-purple-400/15 text-purple-400')
              }
            >
              {t.tier}
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              {/* FREE */}
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-1.5">
                <div className="mb-0.5 text-[9.5px] uppercase tracking-wide opacity-70">FREE</div>
                <div className="text-xs font-bold">
                  +{t.free.coin}🪙 +{t.free.xp}✨{t.free.item ? ' · 🎁' : ''}
                </div>
                {t.unlocked ? (
                  t.free.claimed ? (
                    <Badge variant="secondary" className="mt-1 text-emerald-400">
                      ✓ Đã nhận
                    </Badge>
                  ) : (
                    <ClaimButton tier={t.tier} track="free" />
                  )
                ) : (
                  <ClaimButton disabled label="🔒" />
                )}
              </div>
              {/* PREMIUM */}
              <div className="rounded-lg border border-amber-400/25 bg-amber-400/[0.08] p-1.5">
                <div className="mb-0.5 text-[9.5px] uppercase tracking-wide opacity-70">PREMIUM</div>
                <div className="text-xs font-bold">
                  +{t.premium.coin}🪙 +{t.premium.xp}✨{t.premium.item ? ' · 🏆' : ''}
                </div>
                {t.unlocked ? (
                  !d.progress.has_premium ? (
                    <ClaimButton disabled label="⭐ cần Premium" />
                  ) : t.premium.claimed ? (
                    <Badge variant="secondary" className="mt-1 text-emerald-400">
                      ✓ Đã nhận
                    </Badge>
                  ) : (
                    <ClaimButton tier={t.tier} track="premium" />
                  )
                ) : (
                  <ClaimButton disabled label="🔒" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
