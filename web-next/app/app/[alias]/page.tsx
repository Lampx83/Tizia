/* KHUNG CHẠY APP — mở app trong lòng Tizia thay vì chiếm trọn màn hình.
 *
 * Người học đi từ Trường → Toà nhà → bấm một chức năng → tới đây. Header Tizia
 * (do app/layout.tsx dựng) vẫn nằm trên, thanh chân app nằm dưới, app chạy trong
 * iframe ở giữa — nên người học không bao giờ "rơi" ra khỏi Tizia.
 *
 * Alias → URL thật tra từ GET /api/portal-apps (own → public → builtin):
 *   • app cài qua zip → /portal-apps/u/<owner>/<alias>/
 *   • app builtin     → target_url (trang .html sẵn có trong Tizia)
 */
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { notFound, redirect } from 'next/navigation';
import { tiziaFetch } from '@/lib/tizia';
import { appIcon } from '@/lib/app-icon';

type PortalApp = {
  id: number | string;
  alias: string;
  name: string;
  description: string | null;
  icon: string | null;
  version: string | null;
  kind: 'embedded' | 'builtin';
  url: string;
};
type Res = { own?: PortalApp[]; public?: PortalApp[]; builtin?: PortalApp[] };

async function findApp(alias: string): Promise<PortalApp | null> {
  const res = await tiziaFetch<Res>('/api/portal-apps');
  if (!res.ok || !res.data) return null;
  const { own = [], public: pub = [], builtin = [] } = res.data;
  return [...own, ...pub, ...builtin].find((a) => a.alias === alias) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ alias: string }>;
}): Promise<Metadata> {
  const { alias } = await params;
  const app = await findApp(alias);
  return pageMeta({
    title: app ? app.name : 'Ứng dụng',
    description:
      app?.description ||
      'Ứng dụng học tập chạy trong khung Tizia — mở thẳng trong trình duyệt, không cần cài đặt.',
    path: `/app/${alias}`,
  });
}

export default async function AppFramePage({ params }: { params: Promise<{ alias: string }> }) {
  const { alias } = await params;

  // Alias của app cài qua zip là chữ-thường-gạch-nối, NHƯNG app builtin trong catalog
  // còn có hoa và số đầu ("L3-3-tuong-tac", "PS01-er", "2d-arcade", "3d-shelf") — chặn
  // theo luật của app upload thì 7 app builtin rơi thẳng vào 404. Ở đây chỉ cần lọc ký
  // tự lạ để chặn path traversal, còn tồn tại hay không thì tra danh sách bên dưới.
  if (!/^[A-Za-z0-9][A-Za-z0-9-]{1,60}$/.test(alias)) notFound();

  const res = await tiziaFetch<Res>('/api/portal-apps');

  if (res.status === 401) {
    return (
      <div className="mx-auto w-full max-w-lg py-16 text-center">
        <div className="mb-3 text-[44px]">🔒</div>
        <h1 className="mb-2 text-lg font-bold">Cần đăng nhập để mở ứng dụng</h1>
        <Link
          href={`/login?return=${encodeURIComponent(`/app/${alias}`)}`}
          className="inline-block rounded-lg bg-primary px-4 py-2 text-[14px] font-bold text-primary-foreground hover:opacity-90"
        >
          Đăng nhập
        </Link>
      </div>
    );
  }

  const { own = [], public: pub = [], builtin = [] } = res.data || {};
  const app = [...own, ...pub, ...builtin].find((a) => a.alias === alias);

  if (!app || !app.url) {
    return (
      <div className="mx-auto w-full max-w-lg py-16 text-center">
        <div className="mb-3 text-[44px]">🧩</div>
        <h1 className="mb-2 text-lg font-bold">Không tìm thấy ứng dụng “{alias}”</h1>
        <p className="mb-4 text-[14px] text-muted-foreground">
          Ứng dụng chưa được cài, hoặc chưa được công khai cho tài khoản của bạn.
        </p>
        <Link href="/apps" className="text-[14px] font-semibold text-primary hover:underline">
          ← Xem danh sách ứng dụng
        </Link>
      </div>
    );
  }

  // App builtin BẢN THÂN đã là một trang Tizia (có sẵn header, thanh điều hướng), nhét
  // vào iframe thì header hiện hai lần chồng lên nhau. Chuyển thẳng tới trang đó —
  // người học vẫn ở trong Tizia đúng như khi mở từ toà nhà.
  if (app.kind === 'builtin') redirect(app.url);

  const ico = appIcon(app.icon, app.alias);

  return (
    // Trừ chiều cao header + padding của <main> để khung app vừa đúng một màn hình,
    // không đẩy trang dài ra và không nuốt mất header.
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2">
      {/* Thanh đầu app */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-border bg-card/40 px-3.5 py-2">
        <span className="text-[20px] leading-none">{ico}</span>
        <span className="text-[15px] font-bold">{app.name}</span>
        <span className="font-mono text-[11.5px] text-muted-foreground">
          {app.alias}
          {app.version ? ` · v${app.version}` : ''}
        </span>
        <span className="ml-auto flex items-center gap-3 text-[12.5px]">
          <Link href="/apps" className="text-muted-foreground hover:text-primary">
            ← Ứng dụng
          </Link>
          <a
            href={app.url}
            target="_blank"
            rel="noopener"
            className="text-muted-foreground hover:text-primary"
          >
            ↗ Toàn màn hình
          </a>
        </span>
      </div>

      {/* Khung app */}
      <iframe
        src={app.url}
        title={app.name}
        className="h-[calc(100vh-230px)] min-h-[420px] w-full rounded-xl border border-border bg-white"
        allow="clipboard-write; camera; microphone; fullscreen"
      />

      {/* Thanh chân app */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-border bg-card/40 px-3.5 py-2 text-[12.5px] text-muted-foreground">
        {/* Tới được đây thì chắc chắn là app cài qua zip — builtin đã redirect ở trên. */}
        <span>Ứng dụng chạy trong Tizia · cài qua manifest + zip</span>
        <span className="ml-auto flex items-center gap-3">
          <Link href="/school" className="hover:text-primary">
            🏫 Trường học
          </Link>
          <Link href="/dev" className="hover:text-primary">
            🛠️ Tự làm app
          </Link>
        </span>
      </div>
    </div>
  );
}
