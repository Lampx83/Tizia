'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { registerRequest } from '@/lib/auth-client';
import { UserPlus } from 'lucide-react';

const ROLES = [
  { id: 'pupil', label: '🎒 Học sinh (K-12)' },
  { id: 'student', label: '🎓 Sinh viên' },
  { id: 'teacher', label: '👩‍🏫 Giáo viên' },
];

function RegisterForm() {
  const params = useSearchParams();
  const ret = params.get('return');
  const retQuery = ret ? `?return=${encodeURIComponent(ret)}` : '';

  const [f, setF] = useState({ username: '', displayName: '', password: '', role: 'student', age: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(''); setBusy(true);
    const res = await registerRequest({
      username: f.username.trim(), displayName: f.displayName.trim() || f.username.trim(),
      password: f.password, role: f.role, age: Number(f.age),
    });
    if (res.ok) {
      // Sau đăng ký thường vào /complete-profile (khai ngành/lớp) — trang này còn ở
      // vanilla (fallback), redirect vẫn chạy bình thường qua cửa Next.
      window.location.replace(res.redirectTo || ret || '/');
    } else {
      setErr(res.error || 'Đăng ký thất bại');
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <div className="text-4xl">🌌</div>
          <CardTitle className="text-2xl">Tạo tài khoản Tizia</CardTitle>
          <CardDescription>Chọn vai trò để vào đúng vũ trụ học tập của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button key={r.id} type="button" onClick={() => set('role', r.id)}
                        className={cn('rounded-md border px-2 py-2 text-xs font-medium transition',
                          f.role === r.id ? 'border-primary bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground')}>
                  {r.label}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Tài khoản</label>
              <Input required minLength={3} maxLength={32} placeholder="a-z, 0-9, _ . -"
                     value={f.username} onChange={(e) => set('username', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Tên hiển thị</label>
              <Input placeholder="Tên bạn muốn hiện" value={f.displayName} onChange={(e) => set('displayName', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Mật khẩu</label>
                <Input type="password" required minLength={6} placeholder="≥ 6 ký tự"
                       value={f.password} onChange={(e) => set('password', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Tuổi</label>
                <Input type="number" required min={3} max={100} placeholder="3–100"
                       value={f.age} onChange={(e) => set('age', e.target.value)} />
              </div>
            </div>

            {err && <p className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">{err}</p>}

            <Button type="submit" className="w-full" disabled={busy}>
              <UserPlus className="mr-2 h-4 w-4" /> {busy ? 'Đang tạo…' : 'Tạo tài khoản'}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link href={`/login${retQuery}`} className="font-medium text-primary hover:underline">Đăng nhập</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
