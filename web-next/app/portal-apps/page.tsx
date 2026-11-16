import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import PortalAppsClient, { type PortalApp } from './PortalAppsClient';
import { LoginRequired } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/ui/page-header';

export const metadata: Metadata = pageMeta({
  title: 'Portal Apps · Cài app cho dev',
  description:
    'Developer dashboard: cài app SPA chuẩn AI Portal (manifest.json + .zip) vào Tizia. Quản lý, gỡ, public app của bạn.',
  path: '/portal-apps',
});

type Res = { own?: PortalApp[]; public?: PortalApp[]; builtin?: PortalApp[] };

export default async function PortalAppsPage() {
  const res = await tiziaFetch<Res>('/api/portal-apps');

  if (res.status === 401 || !res.ok || !res.data) {
    return (
      <div className="w-full space-y-6 py-8">
        <PageHeader icon="🧩" title="Portal Apps" description="Ứng dụng web chạy trong Tizia theo chuẩn AI Portal." />
        <LoginRequired returnTo="/portal-apps" description="Đăng nhập để xem các ứng dụng đã cài." />
      </div>
    );
  }

  const { own = [], public: pub = [], builtin = [] } = res.data;
  // Cài app chỉ dành cho admin (app chạy cùng origin, đọc được phiên người xem) — người khác
  // không thấy ô kéo thả, thay vào đó là hướng dẫn gửi gói cho quản trị.
  const me = await tiziaFetch<{ user: { role?: string } | null }>('/api/auth/me');
  const canInstall = me.data?.user?.role === 'admin';

  return (
    <PortalAppsClient own={own} publicApps={pub} builtin={builtin} canInstall={canInstall} />
  );
}
