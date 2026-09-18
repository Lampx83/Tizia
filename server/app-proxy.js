// ============================================================
// App proxy — reverse-proxy external integrated apps under one origin
// ============================================================
// Tizia plugs in sibling apps (ScoreUp, Codelab, Smartdoc, FeedBackMe)
// by reverse-proxying each under a sub-path of its single origin, e.g.
//   <BASE_PATH>/codelab/*  →  http://127.0.0.1:8024/*
//
// Same-origin proxying is what makes iframe embedding (apps.html) and
// cookie/auth sharing work: the browser sees one host. We also STRIP the
// upstream's X-Frame-Options / CSP frame-ancestors so apps that default to
// DENY (e.g. Codelab via Helmet) can still render inside Tizia's iframe.
//
// Mount BEFORE express.json() so POST bodies (login, run-code, submit)
// stream through untouched.
//
// mount vs publicPath: equal for dev/root. They differ when the upstream
// app was BUILT with a basePath that doesn't match the mount (Next.js
// basePath, SPA base) — then we rewrite the prefix when forwarding.
// ============================================================

import http from 'node:http';
import { BASE_PATH } from './base-path.js';

/**
 * @typedef {Object} AppProxyConfig
 * @property {string} id          short id ("codelab")
 * @property {string} mount       path this app receives on ("/codelab" or "<base>/codelab")
 * @property {string} target      upstream origin ("http://127.0.0.1:8024")
 * @property {string} [label]     human label for the down-page ("Codelab")
 * @property {string} [publicPath] upstream's built basePath; defaults to mount
 * @property {string} [startHint] how to start the upstream (shown on down-page)
 * @property {string} [backHref]  link back into Tizia on the down-page
 */

/**
 * Attach one app reverse proxy to an Express app.
 * @param {import('express').Express} app
 * @param {AppProxyConfig} cfg
 */
export function attachAppProxy(app, cfg) {
  const { id, mount, label = id, publicPath = mount, startHint, backHref = '../apps.html' } = cfg;
  const target = String(cfg.target || '').replace(/\/+$/, '');
  const { hostname, port } = new URL(target);
  const rewrite = mount !== publicPath;
  console.log(`[integrations] ${id}: ${mount} → ${target}${rewrite ? ` (rewrite → ${publicPath})` : ''}`);

  app.use(mount, (req, res) => {
    const upstreamPath = rewrite
      ? publicPath + req.originalUrl.slice(mount.length)
      : req.originalUrl;
    const proxyReq = http.request(
      {
        hostname,
        port: port || 80,
        method: req.method,
        path: upstreamPath,
        headers: { ...req.headers, host: `${hostname}:${port}` },
      },
      (proxyRes) => {
        const headers = { ...proxyRes.headers };
        // Allow embedding inside Tizia's same-origin iframe.
        delete headers['x-frame-options'];
        if (headers['content-security-policy']) {
          headers['content-security-policy'] = stripFrameAncestors(headers['content-security-policy']);
        }
        res.writeHead(proxyRes.statusCode || 502, headers);
        proxyRes.pipe(res);
      }
    );
    proxyReq.on('error', (err) => {
      if (res.headersSent) return res.destroy();
      res.status(502).type('html').send(downPage({ label, target, startHint, backHref, err }));
    });
    req.pipe(proxyReq);
  });
}

/**
 * Attach many app proxies at once.
 * @param {import('express').Express} app
 * @param {AppProxyConfig[]} configs
 */
export function attachAppProxies(app, configs) {
  for (const cfg of configs) attachAppProxy(app, cfg);
}

// Danh sách app anh em của Tizia (ScoreUp/Codelab/Smartdoc/FeedBackMe) — chuyển
// từ server/index.js sang đây nguyên vẹn (ticket 06) để plugin tự đứng một
// mình, không cần index.js truyền configs vào qua ctx (registry chỉ cho
// mount(app, ctx) với ctx = { surface }, không có chỗ cho tham số riêng).
function tiziaAppProxyConfigs() {
  return [
    {
      id: 'scoreup', label: 'ScoreUp', mount: `${BASE_PATH}/scoreup`,
      target: process.env.SCOREUP_TARGET || 'http://127.0.0.1:3000',
      publicPath: process.env.SCOREUP_PUBLIC_PATH || undefined,
      startHint: 'cd ScoreUp && ./scripts/dev.sh up',
    },
    {
      id: 'codelab', label: 'Codelab (NEU OJ)', mount: `${BASE_PATH}/codelab`,
      target: process.env.CODELAB_TARGET || 'http://127.0.0.1:8024',
      publicPath: process.env.CODELAB_PUBLIC_PATH || undefined,
      startHint: 'cd Codelab && docker compose up -d',
    },
    {
      id: 'smartdoc', label: 'Smartdoc', mount: `${BASE_PATH}/smartdoc`,
      target: process.env.SMARTDOC_TARGET || 'http://127.0.0.1:8017',
      publicPath: process.env.SMARTDOC_PUBLIC_PATH || undefined,
      startHint: 'cd Smartdoc && docker compose up -d',
    },
    {
      id: 'feedback', label: 'FeedBackMe', mount: `${BASE_PATH}/feedback`,
      target: process.env.FEEDBACK_TARGET || 'http://127.0.0.1:3300',
      publicPath: process.env.FEEDBACK_PUBLIC_PATH || undefined,
      startHint: 'cd FeedBackMe && pnpm db:up && pnpm dev',
    },
  ].map((c) => ({ ...c, publicPath: c.publicPath || c.mount, backHref: `${BASE_PATH || ''}/apps.html` }));
}

// Plugin app-level (PHẢI mount trước express.json() — xem registry.js docstring).
// origin: 'dev-owned' + sourceModule khớp CORE_MODULES → registry từ chối mọi
// proposal AI tự xưng mount lại đúng module này (xem registry.test.js).
export const plugin = {
  name: 'app-proxy',
  origin: 'dev-owned',
  sourceModule: 'server/app-proxy.js',
  mount(app) {
    attachAppProxies(app, tiziaAppProxyConfigs());
  },
};

/** Drop the `frame-ancestors …;` directive so the app can be framed by Tizia. */
function stripFrameAncestors(csp) {
  return String(csp)
    .split(';')
    .filter((d) => !/^\s*frame-ancestors\b/i.test(d))
    .join(';')
    .replace(/^;+|;+$/g, '')
    .trim();
}

function downPage({ label, target, startHint, backHref, err }) {
  return `<!doctype html><html lang="vi"><meta charset="utf-8">
<title>${label} chưa sẵn sàng</title>
<body style="font-family:system-ui,sans-serif;background:#0b1220;color:#e5edf7;padding:48px;line-height:1.7;max-width:680px;margin:auto">
  <h1 style="color:#fbbf24">🔌 ${label} chưa chạy</h1>
  <p>Tizia đang reverse-proxy <strong>${label}</strong> tại <code>${target}</code> nhưng tiến trình không phản hồi.</p>
  ${startHint ? `<p>Khởi động: <code>${startHint}</code></p>` : ''}
  <p style="opacity:.55;font-size:13px">Chi tiết: ${String((err && err.message) || err)}</p>
  <p><a style="color:#38bdf8" href="${backHref}">← Quay lại Tizia</a></p>
</body></html>`;
}
