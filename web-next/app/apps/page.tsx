import type { Metadata } from 'next';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';

export const metadata: Metadata = {
  title: 'Ứng dụng tích hợp — ScoreUp · Codelab · Smartdoc · FeedBackMe | Tizia',
  description:
    '4 ứng dụng tích hợp Tizia một cổng đăng nhập: ScoreUp (chấm điểm), Codelab NEU OJ (luyện code), Smartdoc (tài liệu thông minh), FeedBackMe (góp ý đa chiều).',
};

// Catalog tích hợp built-in — 1 nguồn dữ liệu (đồng bộ với public/js/integrations.js).
type Integration = {
  id: string;
  icon: string;
  name: string;
  tag: string;
  color: string;
  desc: string;
  url?: string;
  path: string;
};

const INTEGRATIONS: Integration[] = [
  {
    id: 'scoreup',
    icon: '📝',
    name: 'ScoreUp',
    tag: 'Thi & luyện trắc nghiệm',
    color: '#f59e0b',
    path: 'scoreup/',
    url: 'https://fit.neu.edu.vn/scoreup/',
    desc: 'Ngân hàng câu hỏi, đề thi, chấm điểm và gợi ý học tập cá nhân hoá.',
  },
  {
    id: 'codelab',
    icon: '💻',
    name: 'Codelab',
    tag: 'Online Judge — chấm code thật',
    color: '#38bdf8',
    path: 'codelab/',
    desc: 'Luyện & thi lập trình, chạy code thật trong sandbox, chấm tự động bằng test case.',
  },
  {
    id: 'smartdoc',
    icon: '📚',
    name: 'Smartdoc',
    tag: 'Giáo trình & bài giảng tương tác',
    color: '#22c55e',
    path: 'smartdoc/',
    desc: 'Biến tài liệu Word/Google Docs thành bài giảng web tương tác và phòng học trực tiếp.',
  },
  {
    id: 'feedback',
    icon: '🎯',
    name: 'FeedBackMe',
    tag: 'LMS · phản hồi · exam',
    color: '#a78bfa',
    path: 'feedback/',
    desc: 'LMS đầy đủ: khoá học, exam có giám thị, phản hồi bằng AI theo lỗi sai và kỹ năng.',
  },
];

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
      <h1 className="text-2xl font-bold tracking-tight">
        🔌 Ứng dụng tích hợp <span className="font-semibold text-muted-foreground">· Tizia</span>
      </h1>
      <p className="mt-3 w-full text-sm leading-relaxed text-muted-foreground">
        Các hệ thống đồng hành được nhúng thẳng vào Tizia qua cùng một origin. Mỗi ứng dụng mở trong
        khung nhúng có thanh điều hướng quay lại. Nếu một ứng dụng chưa chạy, bạn sẽ thấy hướng dẫn
        khởi động ngay trong khung.
      </p>

      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px]">
        {INTEGRATIONS.map((a) => (
          <a
            key={a.id}
            href={`/apps.html?app=${a.id}`}
            className="flex flex-col rounded-2xl border bg-card p-5 no-underline transition-transform hover:-translate-y-[3px] hover:bg-accent"
            style={{ borderTop: `3px solid ${a.color}` }}
          >
            <div className="mb-3 text-[34px] leading-none">{a.icon}</div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">{a.name}</h3>
            <div className="mb-[10px] text-[12.5px] font-bold" style={{ color: a.color }}>
              {a.tag}
            </div>
            <p className="mb-[14px] flex-1 text-[13px] leading-relaxed text-muted-foreground">
              {a.desc}
            </p>
            <div className="text-[13px] font-bold" style={{ color: a.color }}>
              Mở ứng dụng →
            </div>
          </a>
        ))}
      </div>

      <h2 className="mt-8 mb-[14px] flex items-center justify-between text-lg font-semibold">
        <span>🧩 Apps cộng đồng</span>
        <a
          href="/portal-apps.html"
          className="text-[13px] font-semibold no-underline"
          style={{ color: '#fbbf24' }}
        >
          + Cài app mới (dev) →
        </a>
      </h2>

      {portalApps.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px]">
          {portalApps.map((a) => (
            <a
              key={String(a.id)}
              href={`/apps.html?app=portal:${a.id}`}
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
