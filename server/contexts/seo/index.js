// ============================================================
// SEO context — robots.txt, sitemap.xml, public crawlable landing + JSON-LD
// ============================================================
// ⚠️ Từ khi Next làm CỬA TRƯỚC, /robots.txt và /sitemap.xml chạy thật là bản
// Next (web-next/app/robots.ts + app/sitemap.ts) — bản ở đây chỉ phục vụ khi gọi
// thẳng cổng Express (8041). Sửa một bên thì sửa cả bên kia, nếu không hai nguồn
// sẽ nói khác nhau về những trang được index.
//
// Vấn đề nền: makeAuthGate redirect trang HTML chưa login về /login → Googlebot
// không đọc được nội dung. Vì vậy trang nào muốn index PHẢI nằm trong
// PUBLIC_PATH_* ở contexts/identity/auth.js (cả dạng .html lẫn URL sạch).
// ============================================================


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

// Danh mục trang công khai (crawlable). Mở rộng khi có thêm landing.
// lastmod để Google biết trang còn fresh; build-time const + per-request "today".
const todayISO = () => new Date().toISOString().slice(0, 10);

function publicUrls(origin) {
  const lm = todayISO();
  // ⚠️ Từ khi Next làm cửa trước, URL chuẩn là URL SẠCH — bản cũ liệt kê *.html
  // nên mọi mục trong sitemap đều là redirect 308 và Google bỏ qua.
  // Danh sách này phải khớp web-next/app/sitemap.ts (nguồn chính khi chạy qua
  // tizia.vn); bản ở đây chỉ dùng khi gọi thẳng cổng Express.
  const paths = [
    ['/', '1.0', 'daily'],
    ['/kham-pha', '0.9', 'weekly'],
    ['/school', '0.9', 'weekly'],
    ['/apps', '0.8', 'weekly'],
    ['/pricing', '0.8', 'monthly'],
    ['/nang-luc', '0.8', 'monthly'],
    ['/tinh-nang.html', '0.7', 'monthly'],
    ['/luyen-de', '0.9', 'weekly'],
    ['/luat-giao-thong-600', '0.9', 'monthly'],
    ['/tra-cuu-bien-bao-gplx', '0.8', 'monthly'],
    ['/dev', '0.6', 'monthly'],
    ['/register', '0.4', 'yearly'],
    ['/login', '0.3', 'yearly'],
  ];
  // Landing từng trường ảo — 8 trường khách vào thẳng được (GUEST_DOMAINS).
  for (const d of ['preschool', 'primary', 'secondary', 'highschool', 'pharmacy', 'it', 'language', 'driving']) {
    paths.push([`/school?domain=${d}`, '0.8', 'weekly']);
  }
  return paths.map(([p, priority, changefreq]) => ({
    loc: `${origin}${p}`, priority, changefreq, lastmod: lm,
  }));
}

export function attachSeo(r, { basePath = '' } = {}) {
  // robots.txt — Allow trang công khai, Disallow API/admin/login flow nội bộ.
  r.get('/robots.txt', (req, res) => {
    const origin = originOf(req, basePath);
    // Giữ ĐỒNG BỘ với web-next/app/robots.ts (bản Next mới là bản chạy thật qua
    // tizia.vn). Nguyên tắc: mở hết trang học, chặn API + khu vực cá nhân/quản trị.
    res.type('text/plain').send(
      `# Tizia — The Intelligent Zone for Interactive Academy\n` +
      `User-agent: *\n` +
      `Allow: /\n` +
      `# Khu vực động / cần đăng nhập / nội bộ\n` +
      `Disallow: /api/\n` +
      `Disallow: /sim/\n` +
      `Disallow: /uploads/\n` +
      `Disallow: /admin\n` +
      `Disallow: /dashboard\n` +
      `Disallow: /family\n` +
      `Disallow: /teacher\n` +
      `Disallow: /complete-profile\n` +
      `Disallow: /lesson-builder\n` +
      `Disallow: /cast\n` +
      `Disallow: /devices\n` +
      `Disallow: /parent/\n` +
      `Disallow: /gv/\n` +
      `Disallow: /live-quiz/\n` +
      `Disallow: /pharmacomm-giang-vien.html\n` +
      `Disallow: /pharmacomm-ket-qua.html\n` +
      `# Tham số sinh vô số URL trùng nội dung — tránh phí crawl budget\n` +
      `Disallow: /*?return=\n` +
      `Disallow: /*?want=\n` +
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

  // /welcome — TRƯỚC ĐÂY là một landing SSR riêng, sinh ra vì auth gate chặn
  // Googlebot vào trang chủ. Nay trang chủ Next đã công khai và giàu nội dung hơn
  // hẳn, nên /welcome chỉ còn là bản mỏng trùng nội dung (thin/duplicate content —
  // Google trừ điểm). Giữ URL sống bằng 301 để mọi link cũ vẫn về đúng chỗ.
  r.get('/welcome', (req, res) => {
    res.redirect(301, `${basePath}/`);
  });

  console.log('[seo] routes mounted: /robots.txt, /sitemap.xml, /welcome→/');
}
