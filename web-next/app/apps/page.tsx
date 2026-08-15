import type { Metadata } from 'next';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';

export const metadata: Metadata = {
  title: 'Ứng dụng — công cụ & trò chơi học tập trong Tizia',
  description:
    'Danh sách ứng dụng chạy trong Tizia: công cụ học tập, trò chơi, phòng thí nghiệm ảo và app do cộng đồng tự viết rồi cài vào.',
};

// Manifest chuẩn AI Portal đặt icon là TÊN icon Lucide ("FileText") — render như text
// sẽ phình chữ 34px đè lên tên app. Chỉ nhận ký hiệu/emoji, gặp tên chữ-số thì dùng 🧩.
function appIcon(raw?: string | null): string {
  const s = (raw || '').trim();
  if (!s || /[A-Za-z0-9]/.test(s)) return '🧩';
  return s;
}

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
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px]">
          {portalApps.map((a) => (
            <a
              key={String(a.id)}
              href={`/app/${a.alias}`}
              className="flex flex-col rounded-2xl border bg-card p-5 no-underline transition-transform hover:-translate-y-[3px] hover:bg-accent"
              style={{ borderTop: '3px solid #fbbf24' }}
            >
              <div className="mb-3 text-[34px] leading-none">{appIcon(a.icon)}</div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">{a.name}</h3>
              <div className="mb-[10px] text-[12.5px] font-bold" style={{ color: '#fbbf24' }}>
                {a.alias}
                {a.version ? ` · v${a.version}` : ''}
              </div>
              <p className="mb-[14px] flex-1 text-[13px] leading-relaxed text-muted-foreground">
                {a.description || 'Portal app cài qua manifest + zip.'}
              </p>
              <div className="text-[13px] font-bold" style={{ color: '#fbbf24' }}>
                Mở ứng dụng →
              </div>
            </a>
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
