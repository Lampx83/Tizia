import type { Metadata } from 'next';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import { appIcon } from '@/lib/app-icon';
import { groupByDomain } from '@/lib/app-groups';

export const metadata: Metadata = {
  title: 'Ứng dụng — công cụ & trò chơi học tập trong Tizia',
  description:
    'Danh sách ứng dụng chạy trong Tizia: công cụ học tập, trò chơi, phòng thí nghiệm ảo và app do cộng đồng tự viết rồi cài vào.',
};

// Portal app (cài qua /portal-apps.html) — trả từ GET /api/portal-apps.
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
  const portalApps: PortalApp[] =
    res.status === 401 || !res.data
      ? []
      : [...(res.data.own || []), ...(res.data.public || []), ...(res.data.builtin || [])];
  const groups = groupByDomain(portalApps);

  return (
    <div className="w-full py-8">
      <h1 className="flex flex-wrap items-center justify-between gap-2 text-2xl font-bold tracking-tight">
        <span>
          🧩 Ứng dụng <span className="font-semibold text-muted-foreground">· Tizia</span>
        </span>
        <Link href="/dev" className="text-[13px] font-semibold" style={{ color: '#fbbf24' }}>
          + Tự làm app →
        </Link>
      </h1>
      <p className="mt-3 w-full text-sm leading-relaxed text-muted-foreground">
        Công cụ và trò chơi học tập chạy ngay trong Tizia — bấm để mở trong khung, không rời khỏi
        trang. Bạn cũng có thể tự viết app rồi cài vào đây.
      </p>

      {groups.length ? (
        <>
          {/* Nhảy nhanh tới nhóm — 9 nhóm thì cuộn tay khá mệt. */}
          <nav className="mt-5 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.key}
                href={`#nhom-${g.key}`}
                className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-[12.5px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                {g.label}{' '}
                <span className="text-[11.5px] opacity-60">{g.apps.length}</span>
              </a>
            ))}
          </nav>

          {groups.map((g) => (
            <section key={g.key} id={`nhom-${g.key}`} className="mt-7 scroll-mt-20">
              <h2 className="mb-3 flex items-baseline gap-2 text-[15px] font-bold">
                {g.label}
                <span className="text-[12.5px] font-normal text-muted-foreground">
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
                      <span className="block truncate text-[14.5px] font-semibold text-foreground">
                        {a.name}
                      </span>
                      <span className="block truncate text-[12.5px] text-muted-foreground">
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
          <Link href="/dev" style={{ color: '#fbbf24' }}>
            Tự làm app đầu tiên
          </Link>{' '}
          theo chuẩn manifest + zip.
        </p>
      )}
    </div>
  );
}
