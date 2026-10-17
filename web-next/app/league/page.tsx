import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import { cn } from '@/lib/utils';

export const metadata: Metadata = pageMeta({
  title: '🏆 League tuần',
  description:
    'Bảng xếp hạng tuần Tizia — Đồng → Kim cương. Top 5 lên hạng, bottom 5 xuống hạng vào Chủ nhật 23:59 hằng tuần.',
  path: '/league',
});

const TIER_ORDER = ['bronze', 'silver', 'gold', 'sapphire', 'ruby', 'diamond'] as const;

const TIER_ICON: Record<string, string> = {
  bronze: '🥉', silver: '🥈', gold: '🥇', sapphire: '💎', ruby: '🔴', diamond: '💠',
};
const TIER_SHORT: Record<string, string> = {
  bronze: 'Đồng', silver: 'Bạc', gold: 'Vàng', sapphire: 'Lam', ruby: 'Hồng', diamond: 'KC',
};

type TierMeta = { label: string; icon: string; color: string };
type BoardRow = {
  rank: number;
  user_id: number;
  display_name: string | null;
  week_xp: number;
  is_me: boolean;
  role: string | null;
};
type LeagueRes = {
  ok: boolean;
  season: { id: number; week_start: string };
  tier: string;
  tier_meta: TierMeta;
  week_xp: number;
  my_rank: number | null;
  board: BoardRow[];
  promotion_zone: number;
  relegation_zone: number;
};

function roleLabel(r: string | null): string {
  return ({ pupil: '🎒HS', student: '🎓SV', teacher: '👨‍🏫GV', admin: '👑Admin' } as Record<string, string>)[r || ''] || '';
}
function capit(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function League() {
  const res = await tiziaFetch<LeagueRes>('/api/league/me');

  if (res.status === 401 || !res.data?.ok) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để xem league.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  const d = res.data;
  const meta = d.tier_meta;
  const tierIdx = TIER_ORDER.indexOf(d.tier as (typeof TIER_ORDER)[number]);
  const board = d.board;

  return (
    <div className="w-full space-y-4 py-2">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">🏆 League tuần</h1>
      </div>

      {/* Hero */}
      <div
        className="flex flex-wrap items-center gap-5 rounded-2xl border p-6"
        style={{
          borderColor: 'rgba(251,191,36,.35)',
          background:
            'linear-gradient(135deg, rgba(251,191,36,.18), rgba(167,139,250,.10))',
        }}
      >
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full text-5xl shadow-lg"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${meta.color}aa, ${meta.color}33)`,
          }}
        >
          {meta.icon}
        </div>
        <div className="min-w-[200px] flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Tier hiện tại
          </div>
          <div className="my-1 text-2xl font-extrabold" style={{ color: meta.color }}>
            {meta.label}
          </div>
          <div className="text-sm text-muted-foreground">
            Tuần {d.season.week_start} · XP tuần:{' '}
            <b className="text-primary">{d.week_xp}</b> · Hạng{' '}
            <b className="text-primary">
              {d.my_rank ?? '-'}/{board.length}
            </b>
          </div>
        </div>
      </div>

      {/* Tier strip */}
      <div className="flex gap-1.5 overflow-x-auto">
        {TIER_ORDER.map((t) => {
          const cur = t === d.tier;
          return (
            <div
              key={t}
              className={cn(
                'flex-none rounded-xl border px-3 py-2 text-xs transition-opacity',
                cur
                  ? 'border-primary bg-primary/10 font-bold opacity-100'
                  : 'border-border bg-white/5 opacity-55',
              )}
            >
              <span className="mr-1.5 text-base">{TIER_ICON[t]}</span>
              {TIER_SHORT[t]}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="text-[13px] leading-relaxed text-muted-foreground">
        <b className="text-emerald-400">Top 5</b> cuối Chủ nhật → lên tier kế tiếp.{' '}
        <span className="text-rose-400">Bottom 5</span> (nếu nhóm ≥20 người) tụt 1 tier. Mỗi câu
        quiz đúng = 5 XP. Mỗi bài Codelab accepted = 5–20 XP. Claim quest = XP của quest.
      </div>

      {/* Board */}
      <div className="overflow-hidden rounded-xl border bg-card">
        {board.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            Nhóm chưa có ai khác — quay lại sau.
          </div>
        ) : (
          board.map((r, i) => {
            const rank = r.rank;
            const zone =
              rank <= 5
                ? 'promote'
                : board.length >= 20 && rank > board.length - 5
                  ? 'relegate'
                  : '';
            const rankColor =
              rank === 1
                ? 'text-[#fbbf24]'
                : rank === 2
                  ? 'text-[#c0c0c0]'
                  : rank === 3
                    ? 'text-[#cd7f32]'
                    : 'text-muted-foreground';

            return (
              <div key={r.user_id}>
                <div
                  className={cn(
                    'flex items-center gap-3 border-t border-white/5 px-4 py-3 text-sm first:border-t-0',
                    r.is_me &&
                      'border-l-[3px] border-l-primary bg-gradient-to-r from-primary/20 to-transparent pl-[13px]',
                    zone === 'promote' && !r.is_me && 'bg-emerald-500/[.06]',
                    zone === 'relegate' && !r.is_me && 'bg-red-500/[.06]',
                  )}
                >
                  <span className={cn('w-9 text-base font-extrabold', rankColor)}>{rank}</span>
                  <span className="flex-1">
                    <b className="font-bold">{r.display_name || 'Vô danh'}</b>
                    <span className="ml-1.5 text-[11px] text-muted-foreground">
                      {roleLabel(r.role)}
                    </span>
                  </span>
                  <span className="font-extrabold tabular-nums text-primary">
                    {r.week_xp}
                    <span className="ml-0.5 text-[11px] font-medium opacity-60">XP</span>
                  </span>
                </div>

                {rank === 5 && board.length > 5 && (
                  <div className="flex items-center gap-2.5 border-y border-dashed border-border bg-white/[.02] px-4 py-2 text-xs text-emerald-400">
                    <span className="text-sm">⬆️</span> Vùng thăng hạng — Top 5 →{' '}
                    {TIER_ORDER[Math.min(5, tierIdx + 1)]
                      ? capit(meta.label) + ' kế cao hơn'
                      : 'giữ hạng cao nhất'}
                  </div>
                )}
                {board.length >= 20 && rank === board.length - 5 && (
                  <div className="flex items-center gap-2.5 border-y border-dashed border-border bg-white/[.02] px-4 py-2 text-xs text-rose-400">
                    <span className="text-sm">⬇️</span> Vùng xuống hạng — 5 cuối tụt 1 tier
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
