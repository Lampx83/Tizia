// Basic-auth gate for SeaweedFS master/filer web UI (localhost only). Credentials come from env or a generated key printed once.
import http from 'node:http';
import { timingSafeEqual, randomBytes } from 'node:crypto';

const USER = String(process.env.SEAWEED_UI_USER || 'admin');
let password = String(process.env.SEAWEED_UI_PASSWORD || '');
if (password.length < 8) password = randomBytes(12).toString('base64url');
if (password.length < 8) { console.error('[seaweed-ui] password too short'); process.exit(1); }

const targets = {
  9333: { host: process.env.SEAWEED_MASTER_HOST || 'seaweedfs', port: 9333, label: 'master' },
  8888: { host: process.env.SEAWEED_FILER_HOST || 'seaweedfs', port: 8888, label: 'filer' },
};

function authorized(req) {
  const [scheme, encoded] = String(req.headers.authorization || '').split(' ');
  if (scheme !== 'Basic' || !encoded) return false;
  const [user, pass] = Buffer.from(encoded, 'base64').toString('utf8').split(':');
  const a = Buffer.from(String(user) + '\n' + String(pass));
  const b = Buffer.from(USER + '\n' + password);
  return a.length === b.length && timingSafeEqual(a, b);
}

function proxy(listenPort, target) {
  const server = http.createServer((req, res) => {
    if (!authorized(req)) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="SeaweedFS UI", charset="UTF-8"',
        'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Cần đăng nhập để xem SeaweedFS UI.');
    }
    const upstream = http.request({ host: target.host, port: target.port, method: req.method,
      path: req.url, headers: { ...req.headers, host: `${target.host}:${target.port}` } }, (up) => {
      res.writeHead(up.statusCode || 502, up.headers);
      up.pipe(res);
    });
    upstream.on('error', (error) => {
      if (res.headersSent) return res.destroy();
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`SeaweedFS ${target.label} không phản hồi: ${error.message}`);
    });
    req.pipe(upstream);
  });
  server.listen(listenPort, '0.0.0.0', () => console.log(`[seaweed-ui] ${target.label} UI on :${listenPort}`));
  return server;
}

console.log(`[seaweed-ui] đăng nhập bằng user "${USER}" và key in ở dòng dưới (chỉ hiện khi chưa đặt SEAWEED_UI_PASSWORD):`);
console.log(`[seaweed-ui] password: ${password}`);
proxy(9333, targets[9333]);
proxy(8888, targets[8888]);
