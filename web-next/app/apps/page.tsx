import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import { PageHeader } from '@/components/ui/page-header';
import { LoginRequired } from '@/components/ui/empty-state';
import { appIcon } from '@/lib/app-icon';
import { groupByDomain } from '@/lib/app-groups';

export const metadata: Metadata = pageMeta({
  title: 'Ứng dụng — công cụ và trò chơi học tập',
  description:
    'Danh sách ứng dụng chạy trong Tizia: công cụ học tập, trò chơi, phòng thí nghiệm ảo và app do cộng đồng tự viết rồi cài vào.',
  path: '/apps',
});

// Portal app (cài qua /portal-apps) — trả từ GET /api/portal-apps.
type PortalApp = {
  id: number | string;
  alias: string;
  name: string;
  description: string | null;
  icon: string | null;
  version: string | null;
  kind: 'embedded' | 'builtin';
  category: string | null;
  domain?: string | null;
  url: string;
};
type PortalRes = { own?: PortalApp[]; public?: PortalApp[]; builtin?: PortalApp[] };

export default async function AppsPage() {
  // /api/portal-apps requireAuth → guest nhận 401, khi đó chỉ còn built-in integrations.
  const res = await tiziaFetch<PortalRes>('/api/portal-apps');
  const needLogin = res.status === 401;
  const portalApps: PortalApp[] =
    needLogin || !res.data
      ? []
      : [...(res.data.own || []), ...(res.data.public || []), ...(res.data.builtin || [])];
  const groups = groupByDomain(portalApps);

  return (
    <div className="w-full py-8">
      <PageHeader
        icon="🧩"
        title="Ứng dụng"
        description="Công cụ và trò chơi học tập chạy ngay trong Tizia — bấm để mở trong khung, không rời khỏi trang."
        actions={<Link href="/dev" className="text-sm font-semibold text-primary hover:underline">+ Tự làm app →</Link>}
      />

      {needLogin ? (
        <LoginRequired className="mt-6" returnTo="/apps" description="Đăng nhập để xem và mở các công cụ, trò chơi học tập của trường bạn." />
      ) : groups.length ? (
        <>
          {/* Nhảy nhanh tới nhóm — 9 nhóm thì cuộn tay khá mệt. */}
          <nav className="mt-5 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.key}
                href={`#nhom-${g.key}`}
                className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                {g.label}{' '}
                <span className="text-2xs opacity-60">{g.apps.length}</span>
              </a>
            ))}
          </nav>

          {groups.map((g) => (
            <section key={g.key} id={`nhom-${g.key}`} className="mt-7 scroll-mt-20">
              <h2 className="mb-3 flex items-baseline gap-2 text-base font-bold">
                {g.label}
                <span className="text-xs font-normal text-muted-foreground">
                  {g.apps.length} ứng dụng
                </span>
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5">
                {g.apps.map((a) => (
                  <Link
                    key={String(a.id)}
                    href={`/app/${a.alias}`}
                    title={a.description || a.name}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3.5 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-white/[.07] hover:shadow-lg hover:shadow-black/20"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-white/10 bg-white/[.05] text-[24px] leading-none transition-colors group-hover:border-primary/40">
                      {appIcon(a.icon, a.alias)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {a.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {a.description || 'Ứng dụng trong Tizia'}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </>
      ) : (
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground opacity-70">
          Chưa có ứng dụng nào.{' '}
          <Link href="/dev" className="text-primary hover:underline">
            Tự làm app đầu tiên
          </Link>{' '}
          theo chuẩn manifest + zip.
        </p>
      )}
    </div>
  );
}
