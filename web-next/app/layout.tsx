import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import SiteHeader from '@/components/SiteHeader';
import RouteThemeGuard from '@/components/RouteThemeGuard';
import SuggestionFab from '@/components/SuggestionFab';
import SiteFooter from '@/components/SiteFooter';
import JsonLd from '@/components/JsonLd';
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, organizationLd, websiteLd } from '@/lib/seo';
import './globals.css';
import './widgets.css';

// Metadata mặc định cho TOÀN SITE. Trang con ghi đè bằng pageMeta() ở lib/seo.ts.
// metadataBase là gốc để Next dựng URL tuyệt đối cho canonical + og:image —
// phải là domain thật, nếu không thẻ chia sẻ trỏ về localhost (bug cũ).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tizia — Vũ trụ giáo dục ảo 3D · VR · AI cho học sinh Việt Nam',
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'vi_VN',
    url: SITE_URL,
    title: 'Tizia — Vũ trụ giáo dục ảo 3D · VR · AI cho học sinh Việt Nam',
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tizia — Vũ trụ giáo dục ảo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tizia — Vũ trụ giáo dục ảo 3D · VR · AI',
    description: DEFAULT_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  formatDetection: { telephone: false },
};

// theme-color tách riêng theo yêu cầu Next 15+ (không còn nằm trong metadata).
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbbf24' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1020' },
  ],
};

// Chạy TRƯỚC khi paint để chống nhấp nháy: quyết định nền sáng/tối ngay.
// Quy tắc (khớp lib/theme-routes.ts + RouteThemeGuard):
//   • Trang trong allowlist "đọc" → theo lựa chọn 'tizia-theme' (system|light|dark)
//   • MỌI trang khác → ép nền TỐI (app vốn dark-only, tránh chữ trắng/nền trắng)
// ⚠️ Danh sách regex dưới đây phải khớp LIGHT_THEME_ROUTES ở lib/theme-routes.ts.
const themeInit = `(function(){try{var p=(location.pathname||'/').replace(/\\/+$/,'')||'/';var lightOK=/^\\/(index\\.html)?$/.test(p)||/^\\/(kham-pha|on-tap|pricing|league|leaderboard|login|register|complete-profile|dashboard|nang-luc|marketplace|school|space)(\\/|$)/.test(p);var t=localStorage.getItem('tizia-theme')||'system';var ud=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var d=lightOK?ud:true;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Class `dark` do inline script bên dưới quyết định theo lựa chọn người dùng
    // (sáng / tối / theo hệ thống). suppressHydrationWarning vì script đổi class
    // trước khi React hydrate.
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Dữ liệu có cấu trúc toàn site: Tizia là tổ chức giáo dục + có ô tìm kiếm.
            Đặt ở layout để mọi trang đều mang, Google dựng knowledge panel/sitelinks. */}
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <RouteThemeGuard />
        <SiteHeader />
        <main className="w-full px-4 py-6 sm:px-6">{children}</main>
        {/* Chân trang: liên kết nội bộ tới các trang trụ cột (xem SiteFooter). */}
        <SiteFooter />
        {/* Nút 🏛️ Ban điều hành AI — bản React (thay vanilla chèn qua nginx).
            Suspense vì component đọc useSearchParams (?domain=). */}
        <Suspense fallback={null}>
          <SuggestionFab />
        </Suspense>
      </body>
    </html>
  );
}
