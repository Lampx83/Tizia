// Helper client gọi API auth của Tizia (Express, qua proxy same-origin). Giữ đúng
// hành vi vanilla js/auth.js: login/register POST JSON, trả { ok, user, redirectTo }.
export type AuthResult = { ok: boolean; user?: any; redirectTo?: string | null; error?: string };

async function post(path: string, body: unknown): Promise<AuthResult> {
  try {
    const r = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => ({} as any));
    if (r.ok && data?.user) return { ok: true, user: data.user, redirectTo: data.redirectTo || null };
    return { ok: false, error: data?.error || `Lỗi ${r.status}` };
  } catch {
    return { ok: false, error: 'Lỗi mạng. Thử lại.' };
  }
}

export const loginRequest = (username: string, password: string) =>
  post('/api/auth/login', { username, password });

export const registerRequest = (b: {
  username: string; displayName: string; password: string; role: string; age: number;
}) => post('/api/auth/register', b);

export const completeProfileRequest = (b: Record<string, unknown>) =>
  post('/api/auth/complete-profile', b);

export async function logoutRequest() {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
  window.location.replace('/login');
}

export type Provider = { id: string; label: string; color: string; icon: string };
