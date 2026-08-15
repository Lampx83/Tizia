import type { Metadata } from 'next';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import { appIcon } from '@/lib/app-icon';

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

      {portalApps.length ? (
        // Thẻ gọn: icon + tên + ĐÚNG một dòng mô tả. Chi tiết đầy đủ để dành cho lúc
        // mở app, ở đây người học chỉ cần quét mắt tìm đúng thứ mình định dùng.
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5">
          {portalApps.map((a) => (
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
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground opacity-70">
          Chưa có Portal app nào.{' '}
          <Link href="/portal-apps.html" style={{ color: '#fbbf24' }}>
            Cài app đầu tiên
          </Link>{' '}
          theo chuẩn manifest + zip.
        </p>
      )}
    </div>
  );
}
