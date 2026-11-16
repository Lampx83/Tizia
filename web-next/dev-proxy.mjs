// Reverse-proxy DEV: gộp hệ vanilla (Express :8042) + Next (:3201) về CÙNG MỘT
// origin (:8060) → cookie phiên chia sẻ tự nhiên như prod (khỏi login-qua-proxy).
//   /next/*  → Next (chạy với BASE_PATH=/next, nên asset ở /next/_next/*)
//   còn lại  → Express Tizia (trang vanilla + /api/*)
// Zero-dep, chỉ node:http. Prod thật dùng NPM/Nginx, đây là bản mô phỏng dev.
import http from 'node:http';

const NEXT = { host: '127.0.0.1', port: 3201 };
const TIZIA = { host: '127.0.0.1', port: 8042 };
const PORT = Number(process.env.PROXY_PORT) || 8060;

const server = http.createServer((req, res) => {
  const up = req.url.startsWith('/next') ? NEXT : TIZIA;
  const proxyReq = http.request(
    { host: up.host, port: up.port, path: req.url, method: req.method, headers: req.headers },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );
  proxyReq.on('error', (e) => { res.writeHead(502); res.end('proxy error: ' + e.message); });
  req.pipe(proxyReq);
});

// WebSocket (Next HMR khi chạy dev). Prod build không cần, nhưng để sẵn cho an toàn.
server.on('upgrade', (req, socket, head) => {
  const up = req.url.startsWith('/next') ? NEXT : TIZIA;
  const proxyReq = http.request({ host: up.host, port: up.port, path: req.url, method: req.method, headers: req.headers });
  proxyReq.on('upgrade', (proxyRes, proxySocket) => {
    socket.write('HTTP/1.1 101 Switching Protocols\r\n' +
      Object.entries(proxyRes.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n') + '\r\n\r\n');
    proxySocket.pipe(socket); socket.pipe(proxySocket);
  });
  proxyReq.on('error', () => socket.destroy());
  proxyReq.end();
});

server.listen(PORT, () => {
  console.log(`[dev-proxy] http://localhost:${PORT}  →  /next/* = Next :${NEXT.port} · else = Tizia :${TIZIA.port}`);
});
