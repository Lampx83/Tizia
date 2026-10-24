'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginRequest, type Provider } from '@/lib/auth-client';
import { Eye, EyeOff, LogIn } from 'lucide-react';

function LoginForm() {
  const params = useSearchParams();
  const ret = params.get('return');
  const retQuery = ret ? `?return=${encodeURIComponent(ret)}` : '';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    fetch('/api/auth/providers')
      .then((r) => (r.ok ? r.json() : { providers: [] }))
      .then((d) => setProviders(d.providers || []))
      .catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(''); setBusy(true);
    const res = await loginRequest(username.trim(), password);
    if (res.ok) {
      // Trục 1: server tính redirectTo theo role/grade/major. ?return= ưu tiên.
      window.location.replace(ret || res.redirectTo || '/');
    } else {
      setErr(res.error || 'Đăng nhập thất bại');
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <div className="text-4xl">🌌</div>
          <CardTitle className="text-2xl">Tizia</CardTitle>
          <CardDescription>Đăng nhập để vào vũ trụ giáo dục ảo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-sm font-medium">Tài khoản</label>
              <Input id="username" autoComplete="username" required minLength={3} maxLength={32}
                     placeholder="ví dụ: lampx83" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
              <div className="relative">
                <Input id="password" type={showPw ? 'text' : 'password'} autoComplete="current-password"
                       required minLength={6} placeholder="≥ 6 ký tự" value={password}
                       onChange={(e) => setPassword(e.target.value)} className="pr-10" />
                <button type="button" onClick={() => setShowPw((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {err && <p className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">{err}</p>}

            <Button type="submit" className="w-full" disabled={busy}>
              <LogIn className="mr-2 h-4 w-4" /> {busy ? 'Đang đăng nhập…' : 'Đăng nhập'}
            </Button>
            <Button type="button" variant="secondary" className="w-full"
                    onClick={() => window.location.replace('/')}>
              👤 Tiếp tục với tài khoản khách
            </Button>
          </form>

          {providers.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="relative py-1 text-center text-xs text-muted-foreground">
                <span className="bg-card px-2">hoặc</span>
                <span className="absolute inset-x-0 top-1/2 -z-10 border-t" />
              </div>
              {providers.map((p) => (
                <a key={p.id} href={`/api/auth/oauth/${p.id}/start${retQuery}`}
                   className="flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-secondary">
                  Đăng nhập với {p.label}
                </a>
              ))}
            </div>
          )}

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link href={`/register${retQuery}`} className="font-medium text-primary hover:underline">Đăng ký</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
