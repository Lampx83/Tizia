// ─────────────────────────────────────────────────────────────────────────
// SEO helpers cho cửa trước Next.
//
// Vì sao cần file này: metadata của Next chỉ sinh <title>/<description>. Muốn
// Google + mạng xã hội (Facebook/Zalo) hiểu đúng trang thì còn phải có
// canonical, Open Graph, Twitter card và JSON-LD. Gom một chỗ để mọi trang khai
// báo giống nhau, tránh mỗi trang chép tay một kiểu (dễ sai og:url/canonical).
//
// ⚠️ metadataBase quyết định URL tuyệt đối của canonical + og:image. Trước đây
// nó là http://localhost:3200 nên mọi thẻ og trỏ về localhost — chia sẻ link ra
// Facebook/Zalo không hiện ảnh, Google thấy canonical rác.
// ─────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://tizia.vn'
).replace(/\/+$/, '');

export const SITE_NAME = 'Tizia';
export const SITE_TAGLINE = 'The Intelligent Zone for Interactive Academy';
export const DEFAULT_DESCRIPTION =
  'Tizia — vũ trụ giáo dục ảo do AI điều hành: trường Dược, CNTT, Kinh tế và phổ thông (GDPT 2018) với mô phỏng 2D · 3D · VR · Metaverse, gia sư AI và game hoá.';

/** Ghép path tương đối thành URL tuyệt đối trên tizia.vn. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_URL + (path.startsWith('/') ? path : `/${path}`);
}

type PageMetaInput = {
  /** Tiêu đề riêng của trang, KHÔNG kèm "· Tizia" (template ở layout tự nối). */
  title: string;
  description: string;
  /** Đường dẫn canonical, ví dụ '/kham-pha' hoặc '/school?domain=pharmacy'. */
  path: string;
  /** Ảnh chia sẻ riêng. Bỏ trống → dùng ảnh OG mặc định của site. */
  image?: string;
  /** Trang riêng tư (dashboard, quản trị…) → không cho Google index. */
  noindex?: boolean;
  /** Tiêu đề ĐẦY ĐỦ (dùng khi muốn tự viết cả phần đuôi, bỏ qua template). */
  absoluteTitle?: string;
  keywords?: string[];
};

/**
 * Sinh Metadata chuẩn cho một trang: canonical + Open Graph + Twitter card.
 * Dùng ở mọi page.tsx để không trang nào còn thiếu thẻ chia sẻ.
 */
// Ảnh chia sẻ mặc định — PNG 1200×630 sinh động ở app/opengraph-image.tsx.
// Next KHÔNG tự truyền ảnh của route gốc xuống route con, nên phải gắn ở đây
// thì mọi trang mới có og:image (trước đó chỉ trang chủ có).
export const DEFAULT_OG_IMAGE = '/opengraph-image';

export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  absoluteTitle,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle || `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'vi_VN',
      url,
      title: ogTitle,
      description,
      ...(image ? { images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: ogTitle }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    },
  };
}

/** Trang riêng tư / sau đăng nhập: có title tử tế nhưng chặn index. */
export function privateMeta(title: string, description: string, path: string): Metadata {
  return pageMeta({ title, description, path, noindex: true });
}

/**
 * Escape URL trước khi đặt vào <loc> của sitemap.
 *
 * 🪤 Next KHÔNG tự escape nội dung <loc>: một URL có 2 tham số như
 * `/subject?subject=toan&grade=6` sẽ ghi ra `&` trần → cả file sitemap sai cú
 * pháp XML và Google bỏ qua TOÀN BỘ (đã xảy ra 2026-09-02). Hàm này đổi `&`
 * thành `&amp;`, bỏ qua những chỗ vốn đã là thực thể hợp lệ để không escape kép.
 */
export function xmlSafeUrl(url: string): string {
  return url
    .replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ───────────────────────── JSON-LD (dữ liệu có cấu trúc) ─────────────────────────
// Google dùng để hiểu Tizia là tổ chức giáo dục, hiện sitelinks + rich result.

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'vi-VN',
    areaServed: { '@type': 'Country', name: 'Việt Nam' },
    sameAs: [SITE_URL],
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'vi-VN',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/apps?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Breadcrumb — giúp Google hiện đường dẫn thay vì URL trần trong kết quả tìm kiếm. */
export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** Khoá học / môn học — rich result "Course" của Google. */
export function courseLd({
  name,
  description,
  path,
  level,
}: {
  name: string;
  description: string;
  path: string;
  level?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: 'vi-VN',
    ...(level ? { educationalLevel: level } : {}),
    provider: { '@type': 'EducationalOrganization', name: SITE_NAME, sameAs: SITE_URL },
    // Google yêu cầu hasCourseInstance để hợp lệ: Tizia học online, tự học, miễn phí vào.
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT30M',
    },
    offers: {
      '@type': 'Offer',
      category: 'Free',
      price: 0,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
  };
}

/** Câu hỏi thường gặp — rich result FAQ. */
export function faqLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
