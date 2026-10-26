// Signed identity for web -> aiboard-server (ADR 0019). Headers carry user/role/time; HMAC ties them to the shared secret.
import { createHmac, timingSafeEqual } from 'node:crypto';

export const HEADERS = {
  user: 'x-ai-user-id',
  name: 'x-ai-user-name',
  role: 'x-ai-user-role',
  domain: 'x-ai-user-domain',
  timestamp: 'x-ai-timestamp',
  signature: 'x-ai-signature',
};

const WINDOW_MS = 60_000;

function payload(user, now) {
  return [String(user.id), String(user.role), String(user.displayName || user.username || ''),
    String(user.domain || ''), String(now)].join('\n');
}

/** Headers a trusted web process adds when proxying an AI board call. */
export function signInternalHeaders(user, secret, now = Date.now()) {
  if (!secret) throw new Error('AI Board internal secret is required');
  const id = Number(user?.id);
  const role = String(user?.role || '');
  if (!Number.isInteger(id) || id <= 0 || !role) throw new Error('user id and role are required');
  const name = String(user.displayName || user.username || '').slice(0, 60);
  const signature = createHmac('sha256', secret).update(payload({ id, role, displayName: name, domain: String(user.domain || '') }, now)).digest('hex');
  return { [HEADERS.user]: String(id), [HEADERS.name]: name, [HEADERS.role]: role,
    [HEADERS.domain]: String(user.domain || ''), [HEADERS.timestamp]: String(now), [HEADERS.signature]: signature };
}

/** {ok, user} when the signature matches and the timestamp is fresh; otherwise {ok:false}. Never explains why. */
export function verifyInternalHeaders(headers, secret, now = Date.now(), windowMs = WINDOW_MS) {
  if (!secret) return { ok: false };
  const read = (key) => String(headers?.[key] ?? '');
  const id = Number(read(HEADERS.user));
  const role = read(HEADERS.role);
  const name = read(HEADERS.name);
  const domain = read(HEADERS.domain);
  const stamp = Number(read(HEADERS.timestamp));
  const signature = read(HEADERS.signature);
  if (!Number.isInteger(id) || id <= 0 || !role || !signature || !Number.isFinite(stamp)) return { ok: false };
  if (Math.abs(Number(now) - stamp) > windowMs) return { ok: false };
  const expected = createHmac('sha256', secret)
    .update(payload({ id, role, displayName: name, domain }, stamp)).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false };
  return { ok: true, user: { id, role, displayName: name, enrolled_domain: domain || null } };
}

/** Express middleware: attach req.user from the signed headers or answer 401 without details. */
export function requireInternalUser(secret, { now = () => Date.now(), windowMs = WINDOW_MS } = {}) {
  return (req, res, next) => {
    const result = verifyInternalHeaders(req.headers, secret, now(), windowMs);
    if (!result.ok) return res.status(401).json({ error: 'unauthorized' });
    req.user = result.user;
    req.authSource = 'internal-hmac';
    next();
  };
}
