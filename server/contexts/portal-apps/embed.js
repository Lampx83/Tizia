/* PORTAL APPS — hàm thuần (không phụ thuộc DB/Express) cho lớp tương thích AI Portal.
 * Tách riêng để unit-test được mà không cần boot server / kết nối Postgres.
 * index.js import lại từ đây; hành vi giữ nguyên.
 */

export const ALIAS_RE = /^[a-z][a-z0-9-]{1,40}$/; // lowercase, kebab, 2-41 ký tự
// Bắt request tới index của app: "…/<alias>", "…/<alias>/" hoặc "…/<alias>/index.html".
// Dạng KHÔNG dấu / cuối là bắt buộc: Next (cửa trước) mặc định trailingSlash=false nên
// "…/<alias>/" bị 308 về "…/<alias>", rồi express.static lại 301 thêm "/" vào → vòng lặp
// redirect vô tận, app không mở được qua tizia.vn. Trả thẳng index (kèm <base href> tuyệt
// đối nên asset tương đối vẫn resolve đúng) là chỗ cắt vòng lặp.
export const INDEX_INJECT_RE = /^\/portal-apps\/u\/(\d+)\/([a-z][a-z0-9-]{1,40})(?:\/(?:index\.html)?)?$/;

export function validateManifest(json) {
  if (!json || typeof json !== 'object') return { ok: false, error: 'manifest không phải JSON object' };
  const alias = String(json.alias ?? json.id ?? '').trim().toLowerCase();
  if (!ALIAS_RE.test(alias)) return { ok: false, error: 'alias không hợp lệ (cần [a-z0-9-], 2-41 ký tự, bắt đầu bằng chữ)' };
  if (!json.name || typeof json.name !== 'string') return { ok: false, error: 'manifest.name (string) là bắt buộc' };
  // Tương thích AI Portal: chấp nhận type/hasBackend/hasFrontendOnly/supported_languages/apiProxyTarget.
  // Bundled Node code (dist/embed.js) KHÔNG chạy in-process; app có backend phải khai apiProxyTarget
  // (service riêng) → request /api/apps/<alias>/* sẽ được proxy tới đó (xem Tầng 1).
  let apiProxyTarget = null;
  if (typeof json.apiProxyTarget === 'string' && json.apiProxyTarget.trim()) {
    apiProxyTarget = json.apiProxyTarget.trim().replace(/\/+$/, '').slice(0, 300);
  } else if (typeof json.base_url === 'string' && json.base_url.trim()) {
    apiProxyTarget = json.base_url.trim().replace(/\/+$/, '').slice(0, 300);
  }
  return {
    ok: true,
    alias,
    name: String(json.name).slice(0, 120),
    description: json.description ? String(json.description).slice(0, 500) : null,
    icon: json.icon ? String(json.icon).slice(0, 60) : null,
    version: json.version ? String(json.version).slice(0, 40) : null,
    needsBackend: json.hasBackend === true,
    apiProxyTarget,
  };
}

// ── Escape để chèn giá trị vào <script> an toàn (chống </script> breakout) ──
export function escForScript(jsonStr) {
  return String(jsonStr)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
export function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/* Chèn cấu hình host vào <head> của index.html — SAO Y hợp đồng AI Portal (mounted-apps.ts
 * serveIndexHtml). App đọc các global này y hệt khi chạy trên AI Portal ⇒ cùng gói .zip
 * chạy được cả hai nơi mà không sửa code.
 *   • <base href> = thư mục app ⇒ asset tương đối (./assets/…) resolve đúng.
 *   • __WRITE_API_BASE__ / __DATA_API_BASE__ = /api/apps/<alias> (đích proxy Tầng 1).
 *   • __PORTAL_USER__ = { id, email, name } từ session Tizia (null nếu là khách).
 *   • __PORTAL_THEME__ / __AI_PORTAL_LOCALE__ / __PORTAL_BASE_PATH__: theme, ngôn ngữ, base path.
 */
export function injectPortalConfig(html, { alias, ownerId, basePath, user, theme, locale }) {
  const bp = basePath || '';
  const appRoot = `${bp}/portal-apps/u/${ownerId}/${alias}/`;
  const apiBase = `${bp}/api/apps/${alias}`;
  const parts = [`<base href="${escAttr(appRoot)}">`];
  parts.push(`<script>window.__WRITE_API_BASE__=${JSON.stringify(apiBase)};window.__DATA_API_BASE__=${JSON.stringify(apiBase)};</script>`);
  if (bp) parts.push(`<script>window.__PORTAL_BASE_PATH__=${JSON.stringify(bp)};</script>`);
  const themeVal = theme === 'dark' || theme === 'light' ? theme : null;
  if (themeVal) {
    parts.push(`<script>window.__PORTAL_THEME__=${JSON.stringify(themeVal)};document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(${JSON.stringify(themeVal)});</script>`);
  }
  if (locale) parts.push(`<script>window.__AI_PORTAL_LOCALE__=${JSON.stringify(String(locale))};</script>`);
  if (user && user.id != null) {
    const u = { id: String(user.id), email: user.email || '', name: user.display_name || user.username || '' };
    parts.push(`<script>window.__PORTAL_USER__=${escForScript(JSON.stringify(u))};</script>`);
  }
  const inject = `<head>${parts.join('')}`;
  return html.includes('<head>') ? html.replace('<head>', inject) : inject + html;
}

/* Chặn SSRF cơ bản cho proxy Tầng 1: chỉ http(s) và KHÔNG trỏ vào loopback/địa chỉ nội bộ,
 * trừ khi bật PORTAL_APPS_ALLOW_INTERNAL=1 (dev). Chỉ chặn theo host literal — DNS rebinding
 * là mối lo sâu hơn, chấp nhận cho MVP (app phải được admin publish mới proxy được, xem route). */
export function isSafeProxyTarget(rawUrl) {
  let u;
  try { u = new URL(rawUrl); } catch { return false; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
  if (process.env.PORTAL_APPS_ALLOW_INTERNAL === '1') return true;
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host === '0.0.0.0' || host.endsWith('.local') || host.endsWith('.internal')) return false;
  if (host === '::1' || host.startsWith('fc') || host.startsWith('fd') || host.startsWith('fe80')) return false;
  const m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (a === 127 || a === 10 || a === 0) return false;
    if (a === 169 && b === 254) return false;             // link-local
    if (a === 172 && b >= 16 && b <= 31) return false;    // private
    if (a === 192 && b === 168) return false;             // private
  }
  return true;
}
