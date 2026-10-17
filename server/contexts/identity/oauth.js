// SSO/OAuth 2.0 (Authorization Code + PKCE) cho Tizia.
// Hỗ trợ Google, Microsoft Entra ID (Azure AD), GitHub. Mỗi provider chỉ bật khi
// có CLIENT_ID/SECRET trong env — UI chỉ render những nút đã cấu hình.
// Không thêm thư viện ngoài: dùng `fetch` global của Node 20+.

import { randomBytes, createHash } from 'node:crypto';
import {
  findUserByOAuth, linkOAuth, createUser, updateUserProfile, isUsernameTaken,
  createSession,
} from '../../db.js';

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const STATE_TTL_MS = 10 * 60 * 1000;     // 10 phút cho luồng login
const STATE_COOKIE = 'tizia_oauth';
const SESSION_COOKIE = 'tizia_sid';

// ── Providers ──────────────────────────────────────────────────────────────
// `enabled` chỉ true khi env đầy đủ. `profile` map từ JSON userinfo → record chuẩn.
function buildProviders() {
  const list = [];

  // ── Google (Google for Education) ──
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    list.push({
      id: 'google',
      label: 'Google',
      color: '#ea4335',
      icon: 'google',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      scope: 'openid email profile',
      auth_url: 'https://accounts.google.com/o/oauth2/v2/auth',
      token_url: 'https://oauth2.googleapis.com/token',
      userinfo_url: 'https://openidconnect.googleapis.com/v1/userinfo',
      profile: (u) => ({
        subject: u.sub,
        email: u.email || null,
        email_verified: !!u.email_verified,
        display_name: u.name || u.given_name || (u.email || '').split('@')[0],
        avatar_url: u.picture || null,
      }),
    });
  }

  // ── Microsoft Entra ID (Azure AD / Microsoft 365 for Education) ──
  if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
    const tenant = process.env.MICROSOFT_TENANT || 'common';
    list.push({
      id: 'microsoft',
      label: 'Microsoft',
      color: '#2f6fb8',
      icon: 'microsoft',
      client_id: process.env.MICROSOFT_CLIENT_ID,
      client_secret: process.env.MICROSOFT_CLIENT_SECRET,
      scope: 'openid email profile User.Read',
      auth_url: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`,
      token_url: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
      // Lấy profile qua Microsoft Graph để có displayName + mail
      userinfo_url: 'https://graph.microsoft.com/v1.0/me',
      profile: (u) => ({
        subject: u.id,
        email: u.mail || u.userPrincipalName || null,
        email_verified: true,
        display_name: u.displayName || u.givenName || (u.mail || '').split('@')[0],
        avatar_url: null,
      }),
    });
  }

  // ── GitHub (cho trường CNTT) ──
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    list.push({
      id: 'github',
      label: 'GitHub',
      color: '#24292f',
      icon: 'github',
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user user:email',
      auth_url: 'https://github.com/login/oauth/authorize',
      token_url: 'https://github.com/login/oauth/access_token',
      userinfo_url: 'https://api.github.com/user',
      // GitHub trả id (number) + email có thể null nếu user ẩn → fetch /user/emails sau.
      profile: (u) => ({
        subject: String(u.id),
        email: u.email || null,
        email_verified: !!u.email,
        display_name: u.name || u.login,
        avatar_url: u.avatar_url || null,
      }),
      fetchExtraEmail: async (accessToken) => {
        try {
          const r = await fetch('https://api.github.com/user/emails', {
            headers: { Authorization: `token ${accessToken}`, 'User-Agent': 'Tizia' },
          });
          if (!r.ok) return null;
          const emails = await r.json();
          const primary = emails.find(e => e.primary && e.verified) || emails.find(e => e.verified);
          return primary?.email || null;
        } catch { return null; }
      },
    });
  }

  return list;
}

let PROVIDERS = buildProviders();

function getProvider(id) {
  return PROVIDERS.find(p => p.id === id) || null;
}

// ── Cookie helpers ──
function parseCookies(req) {
  const raw = req.headers.cookie;
  if (!raw) return {};
  const out = {};
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

function setCookie(res, name, value, { maxAge, path = '/', sameSite = 'Lax' } = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${path}`, 'HttpOnly', `SameSite=${sameSite}`];
  if (maxAge != null) parts.push(`Max-Age=${Math.floor(maxAge / 1000)}`);
  return parts.join('; ');
}

function appendSetCookie(res, cookieStr) {
  const prev = res.getHeader('Set-Cookie');
  if (prev) res.setHeader('Set-Cookie', [].concat(prev, cookieStr));
  else res.setHeader('Set-Cookie', cookieStr);
}

// ── PKCE ──
function makePkce() {
  const verifier = randomBytes(32).toString('base64url');
  const challenge = createHash('sha256').update(verifier).digest('base64url');
  return { verifier, challenge };
}

// ── Username generator (unique, từ email/display) ──
function slugify(s) {
  return String(s || '')
    .toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9_.-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 24) || 'user';
}
async function uniqueUsername(base) {
  let u = slugify(base);
  if (!await isUsernameTaken(u)) return u;
  for (let i = 1; i < 1000; i++) {
    const cand = `${u}_${i}`;
    if (!await isUsernameTaken(cand)) return cand;
  }
  return `${u}_${randomBytes(3).toString('hex')}`;
}

// ── Tính redirect_uri từ request (tôn trọng reverse-proxy) ──
function computeRedirectUri(req, basePath, providerId) {
  if (process.env.OAUTH_BASE_URL) {
    return `${process.env.OAUTH_BASE_URL.replace(/\/$/, '')}${basePath || ''}/api/auth/oauth/${providerId}/callback`;
  }
  const proto = req.headers['x-forwarded-proto'] || (req.socket?.encrypted ? 'https' : 'http');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}${basePath || ''}/api/auth/oauth/${providerId}/callback`;
}

// ── Routes ──
export function attachOAuth(r, { basePath = '' } = {}) {
  // List providers đã bật — UI dùng để render nút.
  r.get('/api/auth/providers', (_req, res) => {
    res.json({
      providers: PROVIDERS.map(p => ({ id: p.id, label: p.label, color: p.color, icon: p.icon })),
    });
  });

  // Bắt đầu flow — redirect đến provider auth URL.
  r.get('/api/auth/oauth/:provider/start', (req, res) => {
    const p = getProvider(req.params.provider);
    if (!p) return res.status(404).send('provider không tồn tại hoặc chưa cấu hình');

    const state = randomBytes(16).toString('hex');
    const { verifier, challenge } = makePkce();
    const returnTo = String(req.query.return || basePath + '/').slice(0, 300);
    const redirect_uri = computeRedirectUri(req, basePath, p.id);

    // Lưu state + verifier + returnTo trong cookie ngắn hạn (10 phút).
    const payload = Buffer.from(JSON.stringify({ s: state, v: verifier, r: returnTo, p: p.id, t: Date.now() })).toString('base64url');
    appendSetCookie(res, setCookie(res, STATE_COOKIE, payload, { maxAge: STATE_TTL_MS }));

    const url = new URL(p.auth_url);
    url.searchParams.set('client_id', p.client_id);
    url.searchParams.set('redirect_uri', redirect_uri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', p.scope);
    url.searchParams.set('state', state);
    url.searchParams.set('code_challenge', challenge);
    url.searchParams.set('code_challenge_method', 'S256');
    if (p.id === 'google') url.searchParams.set('access_type', 'online');
    res.redirect(url.toString());
  });

  // Callback — đổi code lấy token, fetch userinfo, tìm/tạo user, cấp session.
  r.get('/api/auth/oauth/:provider/callback', async (req, res) => {
    const p = getProvider(req.params.provider);
    if (!p) return res.status(404).send('provider không tồn tại');

    const cookies = parseCookies(req);
    let parsed = null;
    try { parsed = JSON.parse(Buffer.from(cookies[STATE_COOKIE] || '', 'base64url').toString('utf8')); } catch {}
    // Xoá state cookie ngay
    appendSetCookie(res, `${STATE_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);

    if (!parsed || parsed.p !== p.id) {
      return res.status(400).send('OAuth state lỗi hoặc hết hạn. <a href="login.html">Quay lại đăng nhập</a>.');
    }
    if (Date.now() - parsed.t > STATE_TTL_MS) {
      return res.status(400).send('OAuth state hết hạn. <a href="login.html">Đăng nhập lại</a>.');
    }
    if (String(req.query.state || '') !== parsed.s) {
      return res.status(400).send('OAuth state không khớp (CSRF?). <a href="login.html">Đăng nhập lại</a>.');
    }
    const code = String(req.query.code || '');
    if (!code) return res.status(400).send('thiếu authorization code');

    const redirect_uri = computeRedirectUri(req, basePath, p.id);

    try {
      // Đổi code → token
      const tokenResp = await fetch(p.token_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri,
          client_id: p.client_id,
          client_secret: p.client_secret,
          code_verifier: parsed.v,
        }),
      });
      if (!tokenResp.ok) {
        const txt = await tokenResp.text().catch(() => '');
        return res.status(502).send(`đổi token thất bại (${tokenResp.status}): ${txt.slice(0, 200)}`);
      }
      const token = await tokenResp.json();
      const accessToken = token.access_token;
      if (!accessToken) return res.status(502).send('provider không trả access_token');

      // Fetch userinfo
      const userResp = await fetch(p.userinfo_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'User-Agent': 'Tizia',
        },
      });
      if (!userResp.ok) {
        const txt = await userResp.text().catch(() => '');
        return res.status(502).send(`lấy userinfo thất bại (${userResp.status}): ${txt.slice(0, 200)}`);
      }
      const userJson = await userResp.json();
      const profile = p.profile(userJson);
      if (!profile.subject) return res.status(502).send('provider không trả định danh ổn định (subject)');

      // GitHub có thể không trả email trong /user nếu user ẩn email → lấy thêm /user/emails.
      if (!profile.email && p.fetchExtraEmail) {
        profile.email = await p.fetchExtraEmail(accessToken);
        if (profile.email) profile.email_verified = true;
      }

      // Tìm user theo (provider, subject); chưa có → tạo user mới + link.
      let row = await findUserByOAuth(p.id, profile.subject);
      let userId;
      if (row) {
        userId = row.id;
        await updateUserProfile(userId, {
          display_name: row.display_name || profile.display_name,
          email: profile.email,
          avatar_url: profile.avatar_url,
        });
      } else {
        // Sinh username duy nhất từ email local-part hoặc display_name.
        const base = profile.email ? profile.email.split('@')[0] : profile.display_name;
        const username = await uniqueUsername(base || p.id + '_user');
        const created = await createUser({
          username,
          display_name: profile.display_name || username,
          password_hash: '',   // user thuần SSO — không thể login bằng password
          role: 'student',
        });
        userId = created.id;
        await updateUserProfile(userId, { email: profile.email, avatar_url: profile.avatar_url });
        await linkOAuth({ user_id: userId, provider: p.id, subject: profile.subject, email: profile.email });
      }

      // Cấp session + cookie httpOnly y như password login.
      const sessionToken = randomBytes(32).toString('hex');
      await createSession({ token: sessionToken, user_id: userId, ttlMs: SESSION_TTL_MS });
      appendSetCookie(res, setCookie(res, SESSION_COOKIE, sessionToken, { maxAge: SESSION_TTL_MS }));

      // Redirect về returnTo (đã lưu trong state cookie).
      let returnTo = parsed.r || (basePath + '/');
      // Chống open-redirect: chỉ cho phép URL nội bộ.
      if (!/^\/(?!\/)/.test(returnTo)) returnTo = (basePath || '') + '/';
      return res.redirect(returnTo);
    } catch (err) {
      console.error('[oauth] callback failed:', err);
      return res.status(500).send('Lỗi máy chủ khi xử lý OAuth. <a href="login.html">Thử lại</a>');
    }
  });
}

export function listEnabledProviders() {
  return PROVIDERS.map(p => ({ id: p.id, label: p.label }));
}

// Reload provider list (cho hot-reload nếu cần). Không dùng trong runtime hiện tại.
export function reloadProviders() { PROVIDERS = buildProviders(); }
