// ============================================================
// SEO context — robots.txt, sitemap.xml, public crawlable landing + JSON-LD
// ============================================================
// VẤN ĐỀ kiến trúc: makeAuthGate redirect MỌI trang HTML chưa login về
// /login.html → Googlebot không index được nội dung. Giải pháp: tách lớp
// "trang công khai" (landing/giới thiệu trường) KHÔNG qua gate, có meta +
// Open Graph + JSON-LD đầy đủ → Google index được; bấm "Vào học" mới yêu cầu login.
//
// attachSeo PHẢI được whitelist trong auth.js (PUBLIC_PATH_*). Các route ở đây
// là public theo thiết kế.
// ============================================================


import { BASE_PATH } from '../../base-path.js';

// Origin tuyệt đối cho sitemap/canonical: ưu tiên env, fallback từ header request.
function originOf(req, basePath = '') {
  const env = process.env.PUBLIC_ORIGIN;
  if (env) return env.replace(/\/$/, '') + basePath;
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'http').split(',')[0];
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  return `${proto}://${host}${basePath}`;
}

function xmlEscape(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}
function htmlEscape(s) {
  return String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
}

// Danh mục trang công khai (crawlable). Mở rộng khi có thêm landing.
// lastmod để Google biết trang còn fresh; build-time const + per-request "today".
const todayISO = () => new Date().toISOString().slice(0, 10);

function publicUrls(origin) {
  const lm = todayISO();
  // Trang landing chính + crawlable public (đã được thêm vào PUBLIC_PATH_EXACT
  // trong auth.js, được phép qua gate, có SEO meta đầy đủ tại file HTML hoặc qua
  // injectSeoHead). Mỗi entry cần unique URL canonical để tránh duplicate content.
  const urls = [
    { loc: `${origin}/`,                 priority: '1.0', changefreq: 'weekly',  lastmod: lm },
    { loc: `${origin}/welcome`,          priority: '0.9', changefreq: 'weekly',  lastmod: lm },
    { loc: `${origin}/school.html`,      priority: '0.9', changefreq: 'weekly',  lastmod: lm },
    { loc: `${origin}/apps.html`,        priority: '0.9', changefreq: 'monthly', lastmod: lm },
    { loc: `${origin}/pricing.html`,     priority: '0.9', changefreq: 'monthly', lastmod: lm },
    { loc: `${origin}/kham-pha.html`,    priority: '0.8', changefreq: 'monthly', lastmod: lm },
    { loc: `${origin}/tinh-nang.html`,   priority: '0.8', changefreq: 'monthly', lastmod: lm },
    { loc: `${origin}/login.html`,       priority: '0.3', changefreq: 'monthly', lastmod: lm },
    { loc: `${origin}/register.html`,    priority: '0.3', changefreq: 'monthly', lastmod: lm },
  ];
  return urls;
}

// JSON-LD: tổ chức giáo dục + (tuỳ) khoá học. Giúp Google hiện rich snippet.
function jsonLd(origin, school) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: school ? `Tizia · ${school.name}` : 'Tizia',
    alternateName: 'The Intelligent Zone for Interactive Academy',
    url: origin + (school ? `/welcome?school=${school.code}` : '/welcome'),
    logo: `${origin}/favicon.svg`,
    image: `${origin}/og-default.svg`,
    description: 'Vũ trụ giáo dục ảo: nhiều trường ảo (Dược, CNTT, Kinh tế, phổ thông) với 2D · 3D · VR · XR · Metaverse · gamification, do AI điều hành.',
    inLanguage: 'vi-VN',
    areaServed: 'VN',
    sameAs: ['https://tizia.vn'],
  };
  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tizia',
    url: origin + '/',
    inLanguage: 'vi-VN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${origin}/apps?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return JSON.stringify([org, site]);
}

export function attachSeo(r, { basePath = '' } = {}) {
  // robots.txt — Allow trang công khai, Disallow API/admin/login flow nội bộ.
  r.get('/robots.txt', (req, res) => {
    const origin = originOf(req, basePath);
    res.type('text/plain').send(
      `# Tizia — The Intelligent Zone for Interactive Academy\n` +
      `User-agent: *\n` +
      `Allow: /\n` +
      `Allow: /welcome\n` +
      `Allow: /index.html\n` +
      `Allow: /school.html\n` +
      `Allow: /apps.html\n` +
      `Allow: /pricing.html\n` +
      `Allow: /kham-pha.html\n` +
      `Allow: /tinh-nang.html\n` +
      `Allow: /login.html\n` +
      `Allow: /register.html\n` +
      `Allow: /favicon.svg\n` +
      `Allow: /og-default.svg\n` +
      `Allow: /manifest.webmanifest\n` +
      `Allow: /js/\n` +
      `Allow: /img/\n` +
      `Allow: /models/\n` +
      `# Disallow khu vực động / cần đăng nhập / nội bộ\n` +
      `Disallow: /api/\n` +
      `Disallow: /sim/\n` +
      `Disallow: /admin\n` +
      `Disallow: /admin/\n` +
      `Disallow: /admin.html\n` +
      `Disallow: /dashboard.html\n` +
      `Disallow: /family.html\n` +
      `Disallow: /teacher.html\n` +
      `Disallow: /complete-profile.html\n` +
      `Disallow: /lesson-builder.html\n` +
      `Disallow: /parent/\n` +
      `Disallow: /gv/\n` +
      `Disallow: /cast.html\n` +
      `Disallow: /devices.html\n` +
      `Disallow: /live-quiz/\n` +
      `# Chặn bot AI scrape nội dung (tuỳ chọn — bỏ comment để bật)\n` +
      `# User-agent: GPTBot\n# Disallow: /\n` +
      `\n` +
      `Sitemap: ${origin}/sitemap.xml\n`
    );
  });

  // sitemap.xml — động từ danh sách trang công khai + landing mỗi trường.
  r.get('/sitemap.xml', (req, res) => {
    const origin = originOf(req, basePath);
    const items = publicUrls(origin).map((u) =>
      `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    ).join('\n');
    res.set('Cache-Control', 'public, max-age=3600');
    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
    );
  });

  // /welcome — trang công khai (crawlable) giới thiệu nền tảng / 1 trường.
  // Có meta + Open Graph + JSON-LD. CTA "Vào học" mới dẫn tới app (cần login).
  r.get('/welcome', (req, res) => {
    const origin = originOf(req, basePath);
    const school = null;
    const title = 'Tizia — Vũ trụ giáo dục ảo 3D · VR · AI';
    const desc = 'Nền tảng giáo dục ảo: trường Dược, CNTT, Kinh tế và phổ thông với mô phỏng 2D/3D/VR/XR, gamification, gia sư AI và Ban điều hành AI tự cải tiến theo góp ý người học.';
    const canonical = `${origin}/welcome`;
    const ogImage = `${origin}/og-default.svg`;
    res.set('Cache-Control', 'public, max-age=600');
    res.type('html').send(`<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${htmlEscape(title)}</title>
<meta name="description" content="${htmlEscape(desc)}" />
<meta name="robots" content="index,follow,max-image-preview:large" />
<meta name="theme-color" content="#fbbf24" />
<link rel="canonical" href="${htmlEscape(canonical)}" />
<link rel="icon" type="image/svg+xml" href="${basePath}/favicon.svg" />
<link rel="apple-touch-icon" href="${basePath}/apple-touch-icon.png" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Tizia" />
<meta property="og:title" content="${htmlEscape(title)}" />
<meta property="og:description" content="${htmlEscape(desc)}" />
<meta property="og:url" content="${htmlEscape(canonical)}" />
<meta property="og:locale" content="vi_VN" />
<meta property="og:image" content="${htmlEscape(ogImage)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${htmlEscape(title)}" />
<meta name="twitter:description" content="${htmlEscape(desc)}" />
<meta name="twitter:image" content="${htmlEscape(ogImage)}" />
<script type="application/ld+json">${jsonLd(origin, school)}</script>
</head>
<body>
<main>
<h1>${htmlEscape(school ? `Tizia · ${school.name}` : 'Tizia — Vũ trụ giáo dục ảo')}</h1>
<p>${htmlEscape(desc)}</p>
<p><a href="${basePath}/login.html?return=${encodeURIComponent(basePath + '/')}">Vào học ngay →</a></p>
<nav><a href="${basePath}/welcome">Trang chủ</a> · <a href="${basePath}/apps">Ứng dụng</a> · <a href="${basePath}/school">Trường ảo</a></nav>
</main>
</body>
</html>`);
  });

  console.log('[seo] routes mounted: /robots.txt, /sitemap.xml, /welcome');
}

export const plugin = {
  name: 'seo',
  mount(router) {
    attachSeo(router, { basePath: BASE_PATH });
  },
};
