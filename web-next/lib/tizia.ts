import { cookies } from 'next/headers';

// Gọi API Tizia (Express) TỪ SERVER (Server Component / Route Handler). Phải tự
// forward cookie phiên của request đang tới → backend nhận diện đúng user, auth
// dùng chung với hệ hiện tại. Fetch thẳng BACKEND_URL (rewrites chỉ áp cho client).
const BACKEND_URL =
  process.env.BACKEND_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8042' : 'http://localhost:8041');

export async function tiziaFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const cookieHeader = (await cookies()).toString();
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...init,
      headers: { cookie: cookieHeader, ...(init.headers || {}) },
      cache: 'no-store', // dữ liệu cá nhân/động → không cache ở tầng fetch
    });
    let data: T | null = null;
    try { data = (await res.json()) as T; } catch { data = null; }
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export type TiziaUser = {
  id: number;
  display_name: string;
  role: string;
  effective_plan?: string;
  enrolled_domain?: string | null;
};
