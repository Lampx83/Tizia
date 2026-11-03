// Server-side web -> aiboard-server calls (split stack): the acting user is signed with the shared HMAC,
// exactly like the browser proxy does, so the board never trusts an unsigned identity.
import http from 'node:http';
import https from 'node:https';
import { signInternalHeaders } from './ai-board/internal-auth.js';

/** Board-shaped actor from a web session user. */
export function boardActor(user = {}) {
  return { ...user, displayName: user.displayName || user.display_name || user.username,
    domain: user.domain || user.enrolled_domain || '' };
}

/** JSON call signed as `user`; resolves { status, data }. Rejects only when the board is unreachable. */
export function boardRequest(user, method, path, body = null, { env = process.env, timeoutMs = 15_000 } = {}) {
  const base = new URL(String(env.AI_BOARD_SERVER_URL));
  const payload = body == null ? null : JSON.stringify(body);
  const headers = { accept: 'application/json', 'content-type': 'application/json',
    ...signInternalHeaders(boardActor(user), String(env.AI_BOARD_INTERNAL_SECRET || '')) };
  if (payload) headers['content-length'] = Buffer.byteLength(payload);
  return new Promise((resolve, reject) => {
    const request = (base.protocol === 'https:' ? https : http).request({
      hostname: base.hostname,
      port: base.port || (base.protocol === 'https:' ? 443 : 80),
      method, path, headers,
    }, (reply) => {
      let raw = '';
      reply.setEncoding('utf8');
      reply.on('data', (chunk) => { raw += chunk; });
      reply.on('end', () => {
        let data = null;
        try { data = raw ? JSON.parse(raw) : null; } catch { data = { raw }; }
        resolve({ status: reply.statusCode || 0, data });
      });
    });
    request.setTimeout(timeoutMs, () => request.destroy(new Error('aiboard timeout')));
    request.on('error', reject);
    if (payload) request.write(payload);
    request.end();
  });
}
