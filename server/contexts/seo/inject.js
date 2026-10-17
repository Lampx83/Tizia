// ============================================================
// SEO inject helper — bổ sung default meta tags vào <head> những trang
// HTML tĩnh đang thiếu (favicon, og:image, canonical, twitter:card, robots,
// JSON-LD WebSite). Idempotent: nếu trang đã có tag thì không chèn đè.
// ============================================================
//
// Tận dụng pipeline injection sẵn có ở server/index.js (chỗ chèn auth-header.js
// + analytics.js trước </body>). Ta thêm 1 lớp injectSeoHead trước </head>.
//
// Mục tiêu UX: không phá vỡ override thủ công đã có (index.html, school.html,
// /welcome SSR đều đã set meta riêng) — chỉ điền chỗ trống.
// ============================================================

const DEFAULT_DESC = 'Tizia — Vũ trụ giáo dục ảo do AI điều hành. Trường Dược, CNTT, Kinh tế và phổ thông với 2D · 3D · VR · XR · Metaverse · gamification.';
const DEFAULT_SITE_NAME = 'Tizia';

// Trang quản trị / nội bộ — KHÔNG cho phép Google index ngay cả khi auth gate
// fail hoặc bot crawl qua đường vòng. Áp dụng cho exact path hoặc prefix.
const NOINDEX_EXACT = new Set([
  '/admin.html', '/dashboard.html', '/family.html', '/teacher.html',
  '/complete-profile.html', '/lesson-builder.html',
  '/cast.html', '/devices.html',
  // Dạng URL sạch (Next là cửa trước) — cùng danh sách, tránh sót.
  '/admin', '/dashboard', '/family', '/teacher', '/teacher-live',
  '/complete-profile', '/lesson-builder', '/cast', '/devices',
  '/pharmacomm-giang-vien.html', '/pharmacomm-ket-qua.html',
]);
const NOINDEX_PREFIXES = ['/admin/', '/parent/', '/gv/', '/live-quiz/', '/api/', '/sim/'];

function isProtectedPath(urlPath) {
  if (NOINDEX_EXACT.has(urlPath)) return true;
  for (const pref of NOINDEX_PREFIXES) if (urlPath.startsWith(pref)) return true;
  return false;
}

function hasTag(html, regex) { return regex.test(html); }
function htmlEscape(s) {
  return String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
}

// Extract title nội dung để dùng làm fallback og:title / twitter:title.
function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim().replace(/\s+/g, ' ') : DEFAULT_SITE_NAME;
}
// Extract description hiện có (nếu trang đã set).
function extractDesc(html) {
  const m = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
  return m ? m[1].trim() : DEFAULT_DESC;
}

// Suy ra origin tuyệt đối từ request → dùng cho canonical / og:url / og:image.
export function originOf(req, basePath = '') {
  const env = process.env.PUBLIC_ORIGIN;
  if (env) return env.replace(/\/$/, '') + basePath;
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'http').split(',')[0];
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  return `${proto}://${host}${basePath}`;
}

// Sinh các tag cần chèn, bỏ qua tag đã tồn tại.
export function buildSeoHeadTags(html, { origin, urlPath, basePath = '' }) {
  const tags = [];
  const title = extractTitle(html);
  const desc = extractDesc(html);
  const canonical = origin + urlPath;
  // Ảnh chia sẻ: PNG do Next sinh (/opengraph-image). KHÔNG dùng .svg — Facebook,
  // Zalo và Twitter không render og:image dạng SVG, link chia sẻ ra sẽ trống ảnh.
  const ogImage = `${origin}/opengraph-image`;

  if (!hasTag(html, /<meta[^>]+name=["']description["']/i)) {
    tags.push(`<meta name="description" content="${htmlEscape(desc)}" />`);
  }
  if (!hasTag(html, /<meta[^>]+name=["']robots["']/i)) {
    const robots = isProtectedPath(urlPath)
      ? 'noindex,nofollow'
      : 'index,follow,max-image-preview:large';
    tags.push(`<meta name="robots" content="${robots}" />`);
  }
  if (!hasTag(html, /<link[^>]+rel=["']canonical["']/i)) {
    tags.push(`<link rel="canonical" href="${htmlEscape(canonical)}" />`);
  }
  if (!hasTag(html, /<link[^>]+rel=["']icon["']/i)) {
    tags.push(`<link rel="icon" type="image/svg+xml" href="${basePath}/favicon.svg" />`);
  }
  if (!hasTag(html, /<link[^>]+rel=["']apple-touch-icon["']/i)) {
    // PNG chưa tồn tại → fallback SVG (iOS 15+ chấp nhận). Tránh 404 cho touch icon.
    tags.push(`<link rel="apple-touch-icon" href="${basePath}/favicon.svg" />`);
  }
  if (!hasTag(html, /property=["']og:type["']/i)) {
    tags.push(`<meta property="og:type" content="website" />`);
  }
  if (!hasTag(html, /property=["']og:site_name["']/i)) {
    tags.push(`<meta property="og:site_name" content="${DEFAULT_SITE_NAME}" />`);
  }
  if (!hasTag(html, /property=["']og:title["']/i)) {
    tags.push(`<meta property="og:title" content="${htmlEscape(title)}" />`);
  }
  if (!hasTag(html, /property=["']og:description["']/i)) {
    tags.push(`<meta property="og:description" content="${htmlEscape(desc)}" />`);
  }
  if (!hasTag(html, /property=["']og:url["']/i)) {
    tags.push(`<meta property="og:url" content="${htmlEscape(canonical)}" />`);
  }
  if (!hasTag(html, /property=["']og:locale["']/i)) {
    tags.push(`<meta property="og:locale" content="vi_VN" />`);
  }
  if (!hasTag(html, /property=["']og:image["']/i)) {
    tags.push(`<meta property="og:image" content="${htmlEscape(ogImage)}" />`);
    tags.push(`<meta property="og:image:width" content="1200" />`);
    tags.push(`<meta property="og:image:height" content="630" />`);
  }
  if (!hasTag(html, /name=["']twitter:card["']/i)) {
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:title" content="${htmlEscape(title)}" />`);
    tags.push(`<meta name="twitter:description" content="${htmlEscape(desc)}" />`);
    tags.push(`<meta name="twitter:image" content="${htmlEscape(ogImage)}" />`);
  }
  // Preconnect cùng-origin: rỗng vì same-origin tự lo. Inter font load qua system-ui
  // mặc định, không có CDN ngoài nên skip preconnect.

  return tags.join('\n');
}

// Chèn vào trước </head>. Trả về html mới. Nếu không có </head> (HTML hỏng), trả nguyên.
export function injectSeoHead(html, opts) {
  const tags = buildSeoHeadTags(html, opts);
  if (!tags) return html;
  const idx = html.search(/<\/head>/i);
  if (idx < 0) return html;
  return html.slice(0, idx) + '\n' + tags + '\n' + html.slice(idx);
}
