import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// robots.txt do NEXT phục vụ (cửa trước). Bản Express ở server/contexts/seo chỉ
// còn tác dụng khi gọi thẳng cổng 8041 — giữ đồng bộ nội dung ở cả hai nơi.
//
// Nguyên tắc: mở toàn bộ trang học/trải nghiệm (khách xem được), chặn khu vực
// cá nhân + quản trị + API. KHÔNG chặn /_next/ và /js/ /assets/ /models/ vì
// Google cần tải CSS/JS để render trang và chấm Core Web Vitals.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/sim/',
          '/uploads/',
          '/admin',
          '/admin/',
          '/admin.html',
          '/admin-curriculum.html',
          '/admin-grants.html',
          '/dashboard',
          '/family',
          '/teacher',
          '/teacher-live',
          '/complete-profile',
          '/lesson-builder',
          '/cast',
          '/devices',
          '/parent/',
          '/gv/',
          '/live-quiz/',
          '/pharmacomm-giang-vien.html',
          '/pharmacomm-ket-qua.html',
          // Trang có tham số truy vấn sinh vô số biến thể (bẫy crawl budget).
          '/*?return=',
          '/*?want=',
        ],
      },
    ],
    // Hai file: sitemap chính (trang trụ cột) + sitemap thư viện ôn tập (vài nghìn bài).
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/on-tap/sitemap.xml`],
  };
}
